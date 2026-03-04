export const generateAvailabilityMatrix = (
  availability = [],
  upcomingSessions = [],
  daysAhead = 7
) => {

  const today = new Date();

  const sessionMap = new Map();

  upcomingSessions.forEach(session => {

    const key =
      new Date(session.date)
      .toISOString()
      .split("T")[0]
      + "_" +
      session.startTime;

    sessionMap.set(key, session);

  });

  const matrix = [];

  for (let i = 0; i < daysAhead; i++) {

    const currentDate = new Date();
    currentDate.setDate(today.getDate() + i);

    const dateString =
      currentDate.toISOString().split("T")[0];

    const dayName =
      currentDate.toLocaleDateString("en-US", {
        weekday: "long"
      });

    const dayAvailability =
      availability.find(d => d.day === dayName);

    let slots = [];

    if (dayAvailability) {

      for (const slot of dayAvailability.slots) {

        let start = new Date(currentDate);
        let end = new Date(currentDate);

        const [sh, sm] = slot.startTime.split(":");
        const [eh, em] = slot.endTime.split(":");

        start.setHours(sh, sm, 0);
        end.setHours(eh, em, 0);

        while (start < end) {

          const time =
            start.toTimeString().slice(0, 5);

          const key = dateString + "_" + time;

          const session = sessionMap.get(key);

          slots.push({
            time,
            available: session
              ? !session.isBooked
              : true
          });

          start.setMinutes(
            start.getMinutes() +
            slot.sessionDuration
          );

        }

      }

    }

    matrix.push({
      date: dateString,
      day: dayName,
      slots
    });

  }

  return matrix;

};