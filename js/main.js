var listCounters = Array.from(document.querySelectorAll('.counter'));
listCounters = listCounters.map(function (counter) {
  return {
    el: counter,
    isRun: false
  }
})

function getOffset(elem) {
  if (!elem) return

  if (!elem.getClientRects().length) {
    return { top: 0, left: 0 };
  }

  var rect = elem.getBoundingClientRect();
  var win = elem.ownerDocument.defaultView;
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  };
}


window.addEventListener('scroll', function (e) {
  var scrollTop = window.scrollY;
  var heightWindow = window.innerHeight;

  listCounters.forEach(function (obj, index) {
    var isRun = obj.isRun;
    var counter = obj.el;

    if (isRun === false) {
      var duration = Number(counter.getAttribute('duration')) || 3000;
      var dataNumber = Number(counter.getAttribute('data-number')) || 0;
      var offset = getOffset(counter)

      if (scrollTop + heightWindow >= offset.top) {
        if (scrollTop <= offset.top + counter.offsetHeight) {
          // Nhìn thấy phần tử === Chạy hiệu ứng -> set lại isRun = true

          // Chạy hiệu ứng
          runEffectCounter(counter, duration, dataNumber);

          listCounters[index].isRun = true;
        }
      }
    }

  })
})

function runEffectCounter(counter, duration, dataNumber) {
  var id = setInterval(frame, 5);
  var numberEl = counter.querySelector('.number');
  var dataNumberTemp = 0;
  numberEl.innerText = dataNumberTemp;

  var start = new Date().getTime();

  function frame() {
    var end = new Date().getTime();
    if (end - start >= duration) {
      numberEl.innerText = dataNumber;
      clearInterval(id);
    } else {
      var time = end - start;
      var percent = time / duration;
      dataNumberTemp = parseInt(percent * dataNumber);
      numberEl.innerText = dataNumberTemp;
    }
  }
}

$(document).ready(function() {
	$(".fancybox").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none'
	});
});