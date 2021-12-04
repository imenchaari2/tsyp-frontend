const notificationList = [
    {
        title: "'December 03, 2021 18:29:00' ",
        body: 'notification body',
        trigger: new Date('December 03, 2021 23:10:30')
    },
    {
        title: "'December 03, 2021 18:37:00' ",
        body: 'notification body',
        trigger: new Date('December 03, 2021 23:10:40')
    },
    {
        title: "'December 03, 2021 18:37:00' ",
        body: 'notification body',
        trigger: new Date('December 03, 2021 19:01:40')
    },
    {
        title: "taw' ",
        body: 'notification body',
        trigger: new Date('December 04, 2021 15:18:00'),
        data:{screen:"Feedback"},
        image: require('../../../assets/images/coronaReminder.png'),

    },
    {
        title: "taw' ",
        body: 'notification body',
        trigger: new Date('December 04, 2021 15:23:00'),
        data:{screen:"Feedback",image: require('../../../assets/images/coronaReminder.png')},


    },   {
        title: "taw' ",
        body: 'notification body',
        trigger: new Date('December 04, 2021 20:42:00'),
        data:{screen:"Feedback",image: require('../../../assets/images/coronaReminder.png')},

    },
    {
        title: "'November 19, 2021 13:19:00' ",
        body: 'notification body',
        trigger: new Date('December 04, 2021 14:29:00')
    },
    {
        title: "corona reminder",
        body: 'notification body',
        trigger: new Date('December 04, 2021 20:36:00'),
        data:{image: require('../../../assets/images/coronaReminder.png')},

    }
];

export default notificationList;
