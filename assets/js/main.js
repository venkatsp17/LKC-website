$(document).ready(function () {
  $(".nav-link").click(function () {
    $(".nav-link").removeClass("active");
    $(this).addClass("active");

    var target = $(this).attr("href");

    $("html, body").animate(
      {
        scrollTop: $(target).offset().top - 100,
      },
      800
    );
  });
  // counter(1, 30);

  // function counter(i, endNbr) {
  //   elt = document.getElementById("counter1");
  //   console.log("he");
  //   if (i <= 30) {
  //     elt.innerHTML = i + "+ ";
  //     setTimeout(function () {
  //       //Delay a bit before calling the function again.
  //       counter(i + 1, endNbr, elt);
  //     }, 100);
  //   }
  // }
});
