const notificationList = [
    {
        title: "'December 03, 2021 18:29:00' ",
        body: 'notification body',
        trigger: new Date('December 03, 2021 23:10:30'),
        data:{id:1},
    },
    {
        title: "'December 03, 2021 18:37:00' ",
        body: 'notification body',
        trigger: new Date('December 03, 2021 23:10:40'),
        data:{id:2},
    },
    {
        title: "'December 03, 2021 18:37:00' ",
        body: 'notification body',
        trigger: new Date('December 03, 2021 19:01:40'),
        data:{id:3},
    },
    {
        title: "taw' ",
        body: 'notification body',
        trigger: new Date('December 04, 2021 15:18:00'),
        data:{screen:"Feedback",id:4,
        image: `../../../assets/images/coronaReminder.png`,},
       

    },
    {
        title: "taw' ",
        body: 'notification body',
        trigger: new Date('December 04, 2021 15:23:00'),
        data:{screen:"Feedback",image: require('../../../assets/images/coronaReminder.png'),id:5},


    },   {
        title: "taw' ",
        body: 'notification body',
        trigger: new Date('December 04, 2021 15:16:00'),
        data:{screen:"Feedback",image: require('../../../assets/images/coronaReminder.png'),id:6},
        image: require('../../../assets/images/coronaReminder.png'),

    },
    {
        title: "'November 19, 2021 13:19:00' ",
        body: 'notification body',
        trigger: new Date('December 04, 2021 14:29:00'),
        data:{id:7},
    },
    {
        title: "'November 16, 2021 17:20:00'",
        body: 'notification body',
        trigger: new Date('December 03, 2021 23:16:40'),
        data:{id:8},
    }
];

export default notificationList;
