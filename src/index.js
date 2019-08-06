import './styles/app.scss';

(function() {

  let inputNodes = document.querySelectorAll("input.inputText__input");
  let buttonClick = document.querySelectorAll('.button--clicker');

  const onInputFocus = (input) => {
    //console.log("Focus:", input);
    input.target.classList.add("has--content");
  }
  
  const onInputBlur = (input) => {
    //console.log("Blur:", input);
    if(input.target.value == "") {
      input.target.classList.remove("has--content");
    }
  }

  inputNodes.forEach((selectedInput) => {
    if(selectedInput.value !== "") {
      selectedInput.classList.add("has--content");
    }
    selectedInput.addEventListener('focus', onInputFocus);
    selectedInput.addEventListener('blur', onInputBlur);
  });

  const toggleClass = () => {
    const el = document.querySelectorAll('.login');
    console.log(el[0]);
    if ( el[0].classList.contains('active--login') ) {
      el[0].classList.remove('active--login');
      el[0].classList.add('active--signup');
    } else {
      el[0].classList.add('active--login');
      el[0].classList.remove('active--signup');
    }
  }

  buttonClick.forEach((button => {
    button.addEventListener('click', toggleClass);
  }));

})();

