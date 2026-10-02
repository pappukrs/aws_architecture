// Shared logic for review days: timer, drawing checklist, "complete the design"
// dropdowns and "spot the mistakes". Each page sets window.REVIEW before loading this:
//   { target: seconds, items: [html], blanks: [[question, [options], answerIndex]],
//     lines: [[html, isWrong, explanation]] }
(function () {
  const R = window.REVIEW;
  const $ = id => document.getElementById(id);
  const fmt = s => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
  const target = fmt(R.target);

  // ---- Timer ----
  let secs = 0, tick = null;
  function paint() {
    $("clock").textContent = fmt(secs);
    $("clock").classList.toggle("over", secs > R.target);
  }
  $("tStart").onclick = () => {
    if (tick) return;
    tick = setInterval(() => { secs++; paint(); }, 1000);
    $("tStart").disabled = true; $("tDone").disabled = false;
    $("tMeta").textContent = `Drawing… target: under ${target}`;
  };
  $("tDone").onclick = () => {
    clearInterval(tick); tick = null;
    $("tStart").disabled = false; $("tDone").disabled = true;
    $("tStart").textContent = "Resume";
    $("tMeta").textContent = secs <= R.target
      ? `Finished in ${fmt(secs)}. Under the target. Now mark the checklist.`
      : `Finished in ${fmt(secs)}. Over the ${target} target; mark the checklist, then try again tomorrow.`;
  };
  $("tReset").onclick = () => {
    clearInterval(tick); tick = null; secs = 0; paint();
    $("tStart").disabled = false; $("tDone").disabled = true;
    $("tStart").textContent = "Start";
    $("tMeta").textContent = `Target: under ${target}`;
  };
  $("tMeta").textContent = `Target: under ${target}`;

  // ---- Checklist ----
  $("checklist").innerHTML = R.items.map(t => `<li><label><input type="checkbox"><span>${t}</span></label></li>`).join("");
  function score() {
    const n = $("checklist").querySelectorAll("input:checked").length, all = R.items.length;
    const msg = n === all ? "Complete. This is the drawing an interviewer hopes to see."
      : n >= all * 0.8 ? "Strong. Fix the gaps and you are ready for the next week."
      : n >= all * 0.55 ? "The structure is there. Reveal the reference below, note what you missed, and redraw once more."
      : n > 0 ? "Go back to the day pages for the parts you missed, then try again."
      : "Tick each item your drawing contains.";
    $("score").innerHTML = `<b>${n} / ${all}</b> — ${msg}`;
  }
  $("checklist").onchange = score;
  score();

  // ---- Complete the design ----
  $("fill").innerHTML = R.blanks.map((b, i) =>
    `<label for="f${i}">${i + 1}. ${b[0]}</label><select id="f${i}"><option value="">Choose…</option>` +
    b[1].map((o, j) => `<option value="${j}">${o}</option>`).join("") + `</select>`).join("");
  $("fillCheck").onclick = () => {
    let right = 0;
    R.blanks.forEach((b, i) => {
      const s = $("f" + i), ok = s.value !== "" && +s.value === b[2];
      s.classList.toggle("ok", ok); s.classList.toggle("no", !ok);
      if (ok) right++;
    });
    $("fillScore").innerHTML = `<b>${right} / ${R.blanks.length}</b>` +
      (right === R.blanks.length ? " — all correct." : " — red boxes are wrong or empty; change them and check again.");
  };

  // ---- Spot the mistakes ----
  $("mistakes").innerHTML = R.lines.map(l => `<li><label><input type="checkbox"><span>${l[0]}</span></label><p class="why">${l[2]}</p></li>`).join("");
  $("mistCheck").onclick = () => {
    let right = 0;
    [...$("mistakes").children].forEach((li, i) => {
      const ok = li.querySelector("input").checked === R.lines[i][1];
      li.className = ok ? "right" : "miss";
      if (ok) right++;
    });
    $("mistakes").classList.add("checked");
    const wrong = R.lines.filter(l => l[1]).length;
    $("mistScore").innerHTML = `<b>${right} / ${R.lines.length}</b> lines judged correctly. The design had ${wrong} mistakes.`;
  };
})();
