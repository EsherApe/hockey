document.addEventListener('DOMContentLoaded', function() {
  const calendarTodayEl = document.getElementById('calendarToday');
  const calendarTournamentEl = document.getElementById('calendarTournament');
  const calendarOtherEl = document.getElementById('calendarOther');
  let calendar;

  const createCalendar = function (node, options) {
    return new FullCalendar.Calendar(node,  {
      plugins: [ 'dayGrid' ],
      header: {
        left: '',
        center: 'title',
        right: ''
      },
      ...options
    })
  };

  calendar = createCalendar(calendarTournamentEl).render();

  $('a[data-toggle="pill"]').on('click', function (e) {
    calendar && calendar.destroy();
    let target = $(e.target).parent().attr("href");

    console.log(target);

    switch (target) {
      case '#pills-home':
        calendar = createCalendar(calendarTodayEl);
        break;
      case '#pills-profile':
        calendar = createCalendar(calendarTournamentEl);
        break;
      case '#pills-contact':
        calendar = createCalendar(calendarOtherEl);
        break;
    }

    calendar.render();



  });
});
