// Step-by-step reveal for a diagram. Each page sets window.CAPTIONS (index 0 unused)
// and marks SVG groups with data-step="N".
(function () {
  const captions = window.CAPTIONS;
  const $ = id => document.getElementById(id);
  const fullCaption = $("caption").innerHTML;
  const groups = [...document.querySelectorAll("[data-step]")];
  const max = captions.length - 1;
  let step = 0; // 0 = show all

  function render() {
    groups.forEach(g => g.classList.toggle("hidden-step", step !== 0 && +g.dataset.step > step));
    $("caption").innerHTML = step === 0 ? fullCaption : captions[step];
    $("btnPrev").disabled = step <= 1;
    $("btnNext").disabled = step === 0 || step >= max;
  }
  $("btnBuild").onclick = () => { step = 1; render(); };
  $("btnNext").onclick = () => { if (step < max) step++; render(); };
  $("btnPrev").onclick = () => { if (step > 1) step--; render(); };
  $("btnAll").onclick = () => { step = 0; render(); };
  $("btnPractice").onclick = e => {
    const on = $("diagramCard").classList.toggle("practice");
    e.target.textContent = on ? "Reveal diagram" : "Hide diagram (draw from memory)";
  };
})();
