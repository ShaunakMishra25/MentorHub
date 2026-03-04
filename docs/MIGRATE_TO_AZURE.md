# Migrating MentorHub Backend from GCP Cloud Run to Azure Container Apps

This guide outlines the steps to migrate your existing Node.js backend container from Google Cloud Run to Azure Container Apps (ACA).

Azure Container Apps is Microsoft's fully managed, serverless container service. It is very similar to Google Cloud Run, allowing you to run stateless containers that autoscale based on traffic (including scaling to zero).

## Prerequisites

1.  **Azure Account**: An active Azure Subscription.
2.  **Azure CLI**: Installed and logged in (`az login`).
3.  **Docker CLI**: Installed and running locally.

## Step 1: Set Up Azure Container Registry (ACR)

Cloud Run typically uses Google Artifact Registry. For Azure, you'll use Azure Container Registry to store your Docker images.

```bash
# Set variables
RESOURCE_GROUP="mentorhub-rg"
LOCATION="centralindia"
REGISTRY_NAME="mentorhubacr4529" # Name must be globally unique

# 1. Create a Resource Group
az group create --name $RESOURCE_GROUP --location $LOCATION

# 2. Create the Azure Container Registry
az acr create \
  --resource-group $RESOURCE_GROUP \
  --name $REGISTRY_NAME \
  --sku Basic
  
# 3. Log in to the registry
az acr login --name $REGISTRY_NAME
```

## Step 2: Build and Push Your Image to ACR

Use your existing `backend/Dockerfile` to build and push the image to Azure.

```bash
# Navigate to your backend directory
cd backend

# Get the login server address of your ACR (e.g., mentorhubacr12345.azurecr.io)
ACR_LOGIN_SERVER=$(az acr show --name $REGISTRY_NAME --query loginServer --output tsv)

# Build the Docker image natively
docker build -t $ACR_LOGIN_SERVER/mentorhub-backend:latest .

# Push the image to Azure
docker push $ACR_LOGIN_SERVER/mentorhub-backend:latest
```

## Step 3: Create an Azure Container Apps Environment

An Environment acts as a secure boundary around a group of Container Apps.

```bash
ENV_NAME="mentorhub-env"

# Create the Container Apps environment
az containerapp env create \
  --name $ENV_NAME \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION
```

## Step 4: Deploy the Container App

Now, deploy your image as a Container App. 
*Note: Your `Dockerfile` exposes port `8080`, so we will configure the ingress to target that port.*

```bash
APP_NAME="mentorhub-backend-api"

az containerapp create \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --environment $ENV_NAME \
  --image $ACR_LOGIN_SERVER/mentorhub-backend:latest \
  --target-port 8080 \
  --ingress external \
  --registry-server $ACR_LOGIN_SERVER \
  --query properties.configuration.ingress.fqdn
```
*The output of this command will provide the publicly accessible URL (FQDN) of your new Azure backend.*

## Step 5: Configure Environment Variables & Secrets

Cloud Run uses Secret Manager and environment variables. Azure Container Apps handles this via app-level secrets and environment variables.

1.  **Define Secrets** (like your MongoDB connection string or Clerk secrets):
    ```bash
    az containerapp secret set \
      --name $APP_NAME \
      --resource-group $RESOURCE_GROUP \
      --secrets "mongodb-uri=mongodb+srv://..." "clerk-secret=your_secret"
    ```

2.  **Bind Secrets to Environment Variables**:
    ```bash
    az containerapp update \
      --name $APP_NAME \
      --resource-group $RESOURCE_GROUP \
      --set-env-vars "MONGO_URI=secretref:mongodb-uri" "CLERK_SECRET_KEY=secretref:clerk-secret" "PORT=8080"
    ```

## Step 6: Continuous Deployment (CI/CD)

Currently, you might be using `cloudbuild.yaml` for GCP. For Azure, the standard practice is to use **GitHub Actions**.

You can let Azure automatically generate a GitHub Actions workflow that builds and deploys your code on every push:

```bash
az containerapp github-action add \
  --repo-url "https://github.com/your-username/mentorhub" \
  --context-path "./backend" \
  --branch main \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --registry-url $ACR_LOGIN_SERVER
```

## Summary of Differences: Cloud Run vs. Azure Container Apps

| Feature | Google Cloud Run | Azure Container Apps |
| :--- | :--- | :--- |
| **Underlying Tech** | Knative / Borg | Kubernetes (KEDA, Dapr, Envoy) |
| **Registry** | Artifact Registry / Container Registry | Azure Container Registry (ACR) |
| **Ingress Port** | `$PORT` (Defaults to 8080) | Any port (Requires `--target-port`) |
| **Autoscaling** | Concurrency-based | KEDA-based (Event-driven, HTTP) |
| **CI/CD Default** | Cloud Build | GitHub Actions / Azure DevOps |

Your codebase is already well-suited for Azure Container Apps since it is a standard Node.js Docker container. No application code changes should be required!
