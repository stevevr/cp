$(document).ready(function () {
	var lazyloadImages;

	if ("IntersectionObserver" in window) {
		lazyloadImages = document.querySelectorAll(".lazy");
		var imageObserver = new IntersectionObserver(
			function (entries, observer) {
				console.log(observer);
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						var image = entry.target;
						image.src = image.dataset.src;
						image.classList.remove("lazy");
						imageObserver.unobserve(image);
					}
				});
			},
			{
				root: document.querySelector("#container"),
				rootMargin: "0px 0px 500px 0px",
			}
		);

		lazyloadImages.forEach(function (image) {
			imageObserver.observe(image);
		});
	} else {
		var lazyloadThrottleTimeout;
		lazyloadImages = $(".lazy");

		function lazyload() {
			if (lazyloadThrottleTimeout) {
				clearTimeout(lazyloadThrottleTimeout);
			}

			lazyloadThrottleTimeout = setTimeout(function () {
				var scrollTop = $(window).scrollTop();
				lazyloadImages.each(function () {
					var el = $(this);
					if (el.offset().top < window.innerHeight + scrollTop + 500) {
						var url = el.attr("data-src");
						el.attr("src", url);
						el.removeClass("lazy");
						lazyloadImages = $(".lazy");
					}
				});
				if (lazyloadImages.length == 0) {
					$(document).off("scroll");
					$(window).off("resize");
				}
			}, 20);
		}

		$(document).on("scroll", lazyload);
		$(window).on("resize", lazyload);

		// document.getElementById("logo").setAttribute("style", "height: 86px; margin-bottom: 3rem !important; margin-top: 3rem !important");
		document.getElementById("logo").setAttribute("style", "max-height:86px; margin-bottom: 3rem !important; margin-top: 3rem !important");
	}

	// When the user scrolls down 50px from the top of the document, resize the header's font size
	window.onscroll = function () {
		scrollFunction();
	};

	function scrollFunction() {
		if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
			// document.getElementById("logo").setAttribute("style", "height: 40px; margin-bottom: 1rem !important; margin-top: 1rem !important");
			document.getElementById("logo").setAttribute("style", "max-height:40px; margin-bottom: 1rem !important; margin-top: 1rem !important");
		} else {
			// document.getElementById("logo").setAttribute("style", "height: 86px; margin-bottom: 3rem !important; margin-top: 3rem !important");
			document.getElementById("logo").setAttribute("style", "max-height:86px; margin-bottom: 3rem !important; margin-top: 3rem !important");
		}
	}
});
