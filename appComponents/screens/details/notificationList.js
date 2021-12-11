const notificationList = [
  {
    title: "Welcome 💖",
    body: "Welcome dear attendee, Get ready for the fun !",
    trigger: new Date("December 18, 2021 10:00:00"),
    time: "18/12/21 10:00",
    data: {
      image: "tsyp",
    },
  },
  {
    title: "Workshop Subscription",
    body: "Have you subscribed in workshops? if not click me",
    trigger: new Date("December 18, 2021 12:00:00"),
    time: "18/12/21 12:00",
    data: {
      screen: "workshops",
      image: "workshop",
    },
  },
  {
    title: "Check In process",
    body: "Dear attendee you have to scan check in qr code to get your Hotel bracelet and room card entry",
    trigger: new Date("December 20, 2021 08:00:00"),
    time: "20/12/21 07:00",
    data: {
      screen: "qrCode",
      image: "qrCode",
    },
  },
  {
    title: "Covid-19 Reminder ! ",
    body: "Be safe and use hand sanitizer please",
    trigger: new Date("December 20, 2021 09:00:00"),
    time: "20/12/21 09:00",
    data: {
      image: "gel",
    }
  },
  {
    title: "Hotel Map ",
    body: "To help you find your way and not getting lost use this map ",
    trigger: new Date("December 20, 2021 10:00:00"),
    time: "20/12/21 10:00",
    data: {
      screen: "trackingMap",
      image: "trackingMap",
    }
  },
  {
    title: "Covid-19 Reminder ! ",
    body: "Be safe and wear your mask ",
    trigger: new Date("December 20, 2021 11:00:00"),
    time: "20/12/21 11:00",
    data: {
      image: "mask",
    }
  },
  {
    title: " ",
    body: "Be safe and wear your mask ",
    trigger: new Date("December 20, 2021 11:00:00"),
    time: "20/12/21 11:00",
    data: {
      image: "mask",
    }
  },
  {
    title: "Workshop Session 1  ",
    body: "After 15 min session 1 will start \n in room 1",
    trigger: new Date("December 08, 2021 15:29:50"),
    data: {
      image: "workshop",
      id: 3,
    }
  },
  {
    title: "Photo corner ",
    body: "Dear attendee choose your photo \ncorner and get instantly wonderful pictures",
    trigger: new Date("December 08, 2021 15:29:55"),
    data: {
      image: "photo",
      id: 4,
    }
  },
  {
    title: "Rate us ",
    body: "Please rate the event ! we will appreciate it",
    trigger: new Date("December 08, 2021 15:30:00"),
    data: {
      screen: "Feedback",
      image: "rate",
      id: 5,
    }
  },
  {
    title: "Hippy evening ",
    body: "Get ready , the fun will begin shortly",
    trigger: new Date("December 08, 2021 15:30:50"),
    data: {
      image: "hippy",
      id: 6,
    }
  },
  {
    title: "Hollywwod evening",
    body: "Get ready and luxurious , the fun will begin ",
    trigger: new Date("December 07, 2021 22:16:00"),
    data: {
      image: "hollywood",
      id: 7,
    }
  },
  {
    title: "Covid-19 Reminder ! ",
    body: "Be safe and use hand sanitizer please",
    trigger: new Date("December 14, 2021 23:04:10"),
    time: "14/12 23:01",
    data: {
      image: "gel",
      id: 2,
    }
  },
];

export default notificationList;
