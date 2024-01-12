const submit_button = document.getElementById('submit-button');

function darken () {
    submit_button.style.backgroundColor = 'rgb(153, 183.6, 229.5)';
  }
  
  function lighten () {
    submit_button.style.backgroundColor = 'rgb(170, 204, 255)';
  }
  
  function makeSubmitButtonClickable(submit_func){
    submit_button.style.opacity = 1;
    submit_button.addEventListener('click', submit_func);
    submit_button.addEventListener('mouseover', darken);
    submit_button.addEventListener('mouseout', lighten);
  
  }
  
  function greyOutSubmitButton(submit_func){
    submit_button.style.opacity = 0.7;
    submit_button.removeEventListener('click', submit_func);
    submit_button.removeEventListener('mouseover', darken);
    submit_button.removeEventListener('mouseout', lighten);
  }

export {makeSubmitButtonClickable, greyOutSubmitButton};