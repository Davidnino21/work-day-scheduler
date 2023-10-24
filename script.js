dayjs.extend(window.dayjs_plugin_advancedFormat);

$(function () {
  const now = dayjs();
  const today = now.format("dddd, MMMM Do");
  $("#currentDay").text(today);

  for (let i = 9; i <= 17; i++) {
    const hour = i > 12 ? i - 12 + "PM" : i + "AM";
    const text = localStorage.getItem(`hour-${i}`) || ""
    const timeblock = `
      <div id="hour-${i}" class="row time-block ${i < now.hour() ? "past" : i === now.hour() ? "present" : "future"}">
        <div class="col-2 col-md-1 hour text-center py-3">${hour}</div>
        <textarea class="col-8 col-md-10 description" rows="3">${text}</textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>`;
    $("#container").append(timeblock);
  }
  $(".saveBtn").on("click", function () {
    const parent = $(this).parent()
    const hour = parent.attr("id")
    const description = parent.find("textarea").val()
    localStorage.setItem(hour, description)


    $(`<p id="message"class="text-center">Appointment added to <span class="text-danger">Local Storage</span></p>`).insertAfter("header");
    setTimeout(function () {
      $("#message").remove();

    }, 3000);
  });
});


