const duration = 3;

function viewCountToNum(el, duration) {
  const targets = el.querySelectorAll(".counter");
  for (let target of targets) {
    const targetNum = target.dataset.targetnum;
    let specificDuration = (duration / targetNum) * 1000;
    let counter = 1;
    let step;

    const factorFinder = function (num, lowLimit, counter = 2) {
      if (num * counter <= lowLimit) {
        return factorFinder(num, lowLimit, counter + 1);
      } else {
        return counter;
      }
    };

    const lowLimit = 10;
    if (specificDuration < lowLimit) {
      const factor = factorFinder(specificDuration, lowLimit);
      specificDuration *= factor;
      step = factor;
    } else {
      step = 1;
    }

    target.textContent = counter;

    const interval = setInterval(() => {
      if (+target.textContent < targetNum) {
        counter += step;
        if (counter > targetNum) {
          target.textContent = targetNum;
        } else {
          target.textContent = counter;
        }
      } else {
        clearInterval(interval);
      }
    }, specificDuration);
  }
}

const counterContainerEl = document.getElementById("counterContainer");
const footerCounterObserver = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      viewCountToNum(entry.target, duration - 1);
    }
  },
  {
    threshold: 0.3,
  }
);

footerCounterObserver.observe(counterContainerEl);
