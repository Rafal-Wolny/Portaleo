let state = {
  input: 0,
};
let app = document.querySelector('.app');
const renderButton = function () {
  return `<button class="input-text">+</button>`;
};
const renderItem = () => {
  return `<div>Your state value is more than 10</div>`;
};
window.addEventListener('load', () => {
  app.innerHTML = renderButton();
  let input = document.querySelector('.input-text');
  input.addEventListener('click', () => {
    state.input++;
    console.log(state.input);
    if (state.input > 10) app.innerHTML = renderItem();
  });
});
