# Mentor Dashboard Migration

## Goal
Migrate the isolated Vite React mentor dashboard from `dashboard` into the `mentorhub2` Next.js frontend, rewriting its UI to match `mentorhub2`'s Tailwind/shadcn theme, and serving it dynamically under the `/[mentorId]/dashboard` route.

## Tasks
- [ ] Task 1: Create the target Next.js dynamic route `src/app/(protected)/[mentorId]/dashboard` including a base `page.tsx` and `layout.tsx` → Verify: You can visit `http://localhost:3000/some-mentor-id/dashboard` and see a placeholder without 404.
- [ ] Task 2: Analyze and map original `dashboard` components (Cards, Sidebar, Buttons) to `mentorhub2`'s existing `shadcn/ui` components → Verify: Identify matching UI components and configure theme imports.
- [ ] Task 3: Recreate individual dashboard widgets (Profile Header, Stats Cards, Sessions List, Calendar Placeholder) as Next.js Server/Client components adhering to the existing UI theme → Verify: UI widgets exist in the `components/` directory with clean Tailwind classes.
- [ ] Task 4: Assemble the full layout in the new `page.tsx` to replicate the visual structure of the original Vite dashboard, hooking up the dynamic `[mentorId]` to fetch/pass data → Verify: Page renders the complete structure.
- [ ] Task 5: Run comprehensive UI/UX check and adapt responsive styles using Next.js specific Tailwind patterns → Verify: Mobile, Tablet, and Desktop views are functional.

## Done When
- [ ] Dashboard correctly loads under `[mentorId]/dashboard`.
- [ ] UI is fully consistent with the main `mentorhub2` application design system.
- [ ] The React codebase relies on appropriate Next.js App Router conventions instead of Vite ones.
