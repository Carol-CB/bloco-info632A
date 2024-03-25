let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let closeModal =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelectorAll('.item-note');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseNote = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.

/**
 * Modal de edição da anotação
 */
addNote.addEventListener('click',
(evt)=>{
  evt.preventDefault();
  modal.style.display='block';
  document.querySelector('#notes').style.display='none';
  document.querySelector('#controls').style.display='none';
});
