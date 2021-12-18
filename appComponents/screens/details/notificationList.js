const notificationList = [

    {
        title: "Welcome 💖",
        body: "Welcome dear attendee, Get ready for the fun !",
        trigger: new Date("December 19, 2021 12:00:00"),
        time: "18/12/21 12:00",
        data: {
            image: "tsyp",
        },
    },
    {
        title: "Workshop Subscription ✅",
        body: "Have you subscribed in workshops? if not click me",
        trigger: new Date("December 19, 2021 18:00:00"),
        time: "19/12/21 18:00",
        data: {
            screen: "workshops",
            image: "workshop",
        },
    },
    {
        title: "Check In process ✅ 🏫",
        body: "Dear attendee you have to scan check in qr code to get your Hotel bracelet and room card entry",
        trigger: new Date("December 20, 2021 08:00:00"),
        time: "20/12/21 07:00",
        data: {
            screen: "qrCode",
            image: "qrCode",
        },
    },
    {
        title: "Covid-19 Reminder ! 😷 ",
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
        title: "Set up 🏠",
        body: "welcome again please get yourself set up in your room",
        trigger: new Date("December 20, 2021 11:00:00"),
        time: "20/12/21 11:00",
        data: {
            image: "room",
        }
    },
    {
        title: "Lunch 🍽",
        body: "You have free time until 2:30 pm , get Lunch ",
        trigger: new Date("December 20, 2021 12:00:00"),
        time: "20/12/21 12:00",
        data: {
            image: "lunch",
        }
    },
    {
        title: "Covid-19 reminder! 😷",
        body: "Be safe and wear your mask ",
        trigger: new Date("December 20, 2021 11:00:00"),
        time: "20/12/21 11:00",
        data: {
            image: "mask",
        }
    },
    {
        title: "Opening ceremony ⏳",
        body: "Get ready fo the opening Ceremony : IEEE Conferences, SBs presentations and sponsors intervention 15 min later ",
        trigger: new Date("December 20, 2021 14:15:00"),
        time: "20/12/21 14:15",
        data: {
            image: "conference",
        }
    },
    {
        title: "Covid-19 reminder! 😷",
        body: "Be safe and wear your mask please",
        trigger: new Date("December 20, 2021 15:30:00"),
        time: "20/12/21 15:30",
        data: {
            image: "mask",
        }
    },
    {
        title: "Networking 🌎",
        body: "Get to know each other , have a great company",
        trigger: new Date("December 20, 2021 17:50:00"),
        time: "20/12/21 17:50",
        data: {
            image: "networking",
        }
    },
    {
        title: " Dinner 🍽 ",
        body: "get ready and have a nice dinner  ",
        trigger: new Date("December 20, 2021 19:45:00"),
        time: "20/12/21 19:45",
        data: {
            image: "lunch",
        }
    },
    {
        title: " Hippy evening 👩‍🎤 🕶",
        body: "Are you ready for the fun! Hippie time !! Get ready for a warm, relaxed, and cool evening ",
        trigger: new Date("December 20, 2021 20:45:00"),
        time: "20/12/21 20:45",
        data: {
            image: "hippy",
        }
    },
    {
        title: "Photo corner 🎥 ",
        body: "Dear attendee choose your photo \ncorner and get instantly wonderful pictures",
        trigger: new Date("December 20, 2021 21:30:00"),
        time: "20/12/21 21:30",
        data: {
            image: "photo",
        }
    },
    {
        title: "Covid-19 Reminder !😷 ",
        body: "Be safe and use hand sanitizer please",
        trigger: new Date("December 20, 2021 22:00:00"),
        time: "20/12/21 22:00",
        data: {
            image: "gel",
        }
    },
    {
        title: " Surprise! 🤩🎁",
        body: "Announcement of the surprise challenge",
        trigger: new Date("December 20, 2021 23:50:00"),
        time: "20/12/21 19:45",
        data: {
            image: "surprise",
        }
    },
    {
        title: "Feedback 📨",
        body: "Please click me and rate the evening ! we will appreciate it",
        trigger: new Date("December 21, 2021 00:10:00"),
        time: "21/12/21 00:10",
        data: {
            screen: "Feedback",
            image: "rate",
        }
    },
    {
        title: "Breakfast 🌅",
        body: "Good morning, get fresh and have a nice breakfast",
        trigger: new Date("December 21, 2021 07:00:00"),
        time: "21/12/21 07:00",
        data: {
            image: "lunch",
        }
    },
    {
        title: "Job fair ⏳",
        body: "Launch of the job fair & Sponsors intervention 15 min later ",
        trigger: new Date("December 21, 2021 08:45:00"),
        time: "21/12/21 09:09",
        data: {
            image: "jobFair",
        }
    },
    {
        title: "Covid-19 Reminder !😷 ",
        body: "Be safe and use hand sanitizer please",
        trigger: new Date("December 21, 2021 09:30:00"),
        time: "21/12/21 09:30",
        data: {
            image: "gel",
        }
    },
    {
        title: "Workshops session 1 is near to begin ⏳ 🕥 ",
        body: "Everyone should go to the room mentioned in the workshop you have subscribed in and scan the Qr code to validate your subscription ",
        trigger: new Date("December 21, 2021 10:20:00"),
        time: "21/12/21 09:50",
        data: {
            image: "workshop",
        }
    },
    {
        title: "Covid-19 reminder! 😷",
        body: "Be safe and wear your mask please",
        trigger: new Date("December 21, 2021 11:20:00"),
        time: "21/12/21 11:20",
        data: {
            image: "mask",
        }
    },
    {
        title: "Stands visit",
        body: "Stands visit & Networking ",
        trigger: new Date("December 21, 2021 12:00:00"),
        time: "21/12/21 12:00",
        data: {
            image: "stand",
        }
    },
    {
        title: "Lunch 🍽",
        body: "You have free time until 2 pm , get Lunch ",
        trigger: new Date("December 20, 2021 12:20:00"),
        time: "21/12/21 12:20",
        data: {
            image: "lunch",
        }
    },
    {
        title: "Workshops session 2 is near to begin ⏳ 🕑",
        body: "Everyone should go to the room mentioned in the workshop you have subscribed in and scan the Qr code to validate your subscription ",
        trigger: new Date("December 21, 2021 13:50:00"),
        time: "21/12/21 13:50",
        data: {
            image: "workshop",
        }
    },
    {
        title: "Covid-19 reminder! 😷",
        body: "Be safe and wear your mask please",
        trigger: new Date("December 21, 2021 15:10:00"),
        time: "21/12/21 15:10",
        data: {
            image: "mask",
        }
    },
    {
        title: "Stands visit",
        body: "Stands visit & Networking ",
        trigger: new Date("December 21, 2021 16:00:00"),
        time: "21/12/21 16:00",
        data: {
            image: "stand",
        }
    },
    {
        title: "Workshops session 3 is near to begin ⏳ 🕟 ",
        body: "Everyone should go to the room mentioned in the workshop you have subscribed in and scan the Qr code to validate your subscription ",
        trigger: new Date("December 21, 2021 16:20:00"),
        time: "21/12/21 16:20",
        data: {
            image: "workshop",
        }
    },
    {
        title: "Dinner 🍽 ",
        body: "I hope you are enjoying your day and getting benifits after 3 sessions of workshops , now get a nice dinner",
        trigger: new Date("December 21, 2021 19:50:00"),
        time: "21/12/21 19:50",
        data: {
            image: "lunch",
        }
    },
    {
        title: "Hollywood party 🌟🤩💃",
        body: "Glitter and glam are usually the name of the game, a vintage Hollywood party get stylish and luxurious tonight",
        trigger: new Date("December 21, 2021 20:45:00"),
        time: "21/12/21 20:45",
        data: {
            image: "hollywood",
        }
    },
    {
        title: "Photo corner 🎥 ",
        body: "Dear attendee choose your photo \ncorner and get instantly wonderful pictures",
        trigger: new Date("December 21, 2021 21:30:00"),
        time: "21/12/21 21:30",
        data: {
            image: "photo",
        }
    },
    {
        title: "Covid-19 Reminder ! 😷 ",
        body: "Be safe and use hand sanitizer please",
        trigger: new Date("December 21, 2021 22:00:00"),
        time: "21/12/21 22:00",
        data: {
            image: "gel",
        }
    },
    {
        title: "Rate us ! 🌟",
        body: "Please click me and rate the event ! we will appreciate it",
        trigger: new Date("December 22, 2021 00:10:00"),
        time: "22/12/21 00:10",
        data: {
            screen: "Feedback",
            image: "rate",
        }
    },
    {
        title: "Morning ! 🌅",
        body: "It's the last day , get fresh and have a nice breakfast",
        trigger: new Date("December 22, 2021 07:00:00"),
        time: "22/12/21 07:00",
        data: {
            image: "lunch",
        }
    },
    {
        title: "Covid-19 reminder! 😷",
        body: "Be safe and wear your mask ",
        trigger: new Date("December 22, 2021 09:00:00"),
        time: "22/12/21 09:00",
        data: {
            image: "mask",
        }
    },
    {
        title: "Anouncement of awards ! 🏆 ",
        body: "Tunisia Section awards",
        trigger: new Date("December 22, 2021 09:00:00"),
        time: "22/12/21 09:00",
        data: {
            image: "awards",
        }
    },
    {
        title: " Announcement of SB winner for TSYP9 ! 🏆",
        body: "Are you excited ! be ready to the finalist announcement !",
        trigger: new Date("December 22, 2021 10:50:00"),
        time: "22/12/21 10:50",
        data: {
            image: "award",
        }
    },
    {
        title: "Rate us ! 🌟",
        body: "The event is over , we hope that you enjoyed it every second ! Please click me and rate us !",
        trigger: new Date("December 22, 2021 14:00:00"),
        time: "22/12/21 14:00",
        data: {
            screen: "Feedback",
            image: "rate",
        }
    },
];

export default notificationList;
