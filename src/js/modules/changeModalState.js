import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
  const windowForm = document.querySelectorAll('.balcon_icons_img');
  const windowWidth = document.querySelectorAll('#width');
  const windowHeight = document.querySelectorAll('#height');
  const windowType = document.querySelectorAll('#view_type');
  const windowProfile = document.querySelectorAll('.checkbox');

  checkNumInputs('#width');
  checkNumInputs('#height');

  const bindActionToElem = (event, elem, prop) => {
    elem.forEach((item, i) => {
      item.addEventListener(event, () => {
        switch (item.nodeName) {
          case 'SPAN':
            state[prop] = i;
            break;
          case 'INPUT':
            if(item.getAttribute('type') === 'checkbox') {
              i === 0 ? state[prop] = 'Cold' : state[prop] = 'Hot';
              elem.forEach((box, j) => {
                box.checked = i === j;
              });
            } else {
              state[prop] = item.value;
            }
            break;
          case 'SELECT':
            state[prop] = item.value;
            break;
        }
        console.log(state);
      });
    });
  }

  bindActionToElem('click', windowForm, 'form');
  bindActionToElem('input', windowWidth, 'width');
  bindActionToElem('input', windowHeight, 'height');
  bindActionToElem('change', windowType, 'type');
  bindActionToElem('change', windowProfile, 'profile');

}

export default changeModalState;