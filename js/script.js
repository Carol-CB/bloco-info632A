let addNote = document.querySelector("#add-note"); //Botão de para adicionar nota
let closeModalView = document.querySelector("#close-modal"); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector("#modal"); //Modal para edição das notas
let modalView = document.querySelector("#modal-view"); //Modal para exibição dos detalhes da nota
let notes = document.querySelector("#notes"); //Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseModal = document.querySelector("#btn-close-note"); //icone para fechar modal de edição de nota.

//++++++++++++++++EVENTOS+++++++++++++++++++

addNote.addEventListener("click", (evt) => {
  evt.preventDefault(); //PREVINE DA PÁGINA RECARREGAR COM O LINK

  //limpa os campos de entrada antes de adicionar uma nova nota pois estava interferindo ao criar outra
  document.querySelector("#input-id").value = "";
  document.querySelector("#input-title").value = "";
  document.querySelector("#input-content").value = "";

  modal.style.display = "block";
  notes.style.display = "none";
  addNote.style.display = "none";
});

btnCloseModal.addEventListener("click", (evt) => {
  evt.preventDefault();
  listNotes();
  modal.style.display = "none";
  notes.style.display = "flex";
  addNote.style.display = "block";
});

btnSaveNote.addEventListener("click", (evt) => {
  evt.preventDefault();
  let objNote = {
    id: document.querySelector("#input-id").value.trim(),
    title: document.querySelector("#input-title").value.trim(),
    content: document.querySelector("#input-content").value.trim(),
    lastTime: new Date().getTime(), //atualiza a data da última modificação
  };
  console.log(objNote);
  saveNote(objNote);
});

closeModalView.addEventListener("click", (evt) => {
  evt.preventDefault();
  modalView.style.display = "none";
  notes.style.display = "flex";
  addNote.style.display = "block";
});

//+++++++++++++++FUNÇÕES+++++++++++++++++++++

const saveNote = (note) => {
  let listNotes = loadNotes();

  if (note.id.length < 1) {
    note.id = new Date().getTime();
    document.querySelector("#input-id").value = note.id;
    listNotes.push(note);
  } else {
    console.log(note.id);
    listNotes.forEach((item, i) => {
      if (item.id == note.id) {
        listNotes[i] = note;
      }
    });
  }
  note.lastTime = new Date().getTime();

  console.log(listNotes);
  listNotes = JSON.stringify(listNotes);
  localStorage.setItem("notes", listNotes);
};

const loadNotes = () => {
  let list = localStorage.getItem("notes");
  console.log(list);

  if (!list) {
    list = [];
  } else {
    //try-catch para se ocorrer um erro, imprimir uma mensagem de erro no console e inicializar list vazio
    try {
      list = JSON.parse(list);
    } catch (error) {
      console.error("Erro ao fazer parsing do JSON:", error);
      list = [];
    }
  }

  return list;
};

const showNotes = (note) => {
  document.querySelector("#title-note").innerHTML =
    "<h1>" + note.title + "</h1>";
  document.querySelector("#content-note").innerHTML =
    "<p>" + note.content + "</p>";
  document.querySelector("#content-note").innerHTML +=
    "<p>Última alteração: " +
    new Date(note.lastTime).toLocaleDateString() +
    "</p>";
  document.querySelector("#controls-note").innerHTML = "";

  let aDelete = document.createElement("a");
  let i = document.createElement("i");
  i.style.color = "#F00";
  i.className = "bi";
  i.className = "bi-trash";
  aDelete.appendChild(i);
  document.querySelector("#controls-note").appendChild(aDelete);
  aDelete.addEventListener("click", (evt) => {
    evt.preventDefault();
    deleteNote(note.id);
  });

  //botão de edição do lado do botão de excluir
  let aEdit = document.createElement("a");
  let iEdit = document.createElement("i");
  iEdit.className = "bi bi-pencil-square";
  aEdit.appendChild(iEdit);
  document.querySelector("#controls-note").appendChild(aEdit);
  aEdit.addEventListener("click", (evt) => {
    evt.preventDefault();
    editNote(note);
  });

  modalView.style.display = "block";
  notes.style.display = "none";
  addNote.style.display = "none";
};

const deleteNote = (id) => {
  let listNotes = loadNotes();
  listNotes.forEach((note, index) => {
    if (note.id === id) {
      listNotes.splice(index, 1); //tira o elemento do array na posição do index apontado
    }
  });

  localStorage.setItem("notes", JSON.stringify(listNotes)); //atualiza o armazenamento local
  location.reload(); //reloda a página
};

const editNote = (note) => {
  //modal de edição com os detalhes da nota atual
  document.querySelector("#input-id").value = note.id;
  document.querySelector("#input-title").value = note.title;
  document.querySelector("#input-content").value = note.content;

  modalView.style.display = "none";

  modal.style.display = "block";
  notes.style.display = "none";
  addNote.style.display = "none";
};

const listNotes = () => {
  notes.innerHTML = "";
  let listNotes = loadNotes();
  listNotes.forEach((item) => {
    let divCard = document.createElement("div");
    divCard.className = "card";
    divCard.style.width = "18rem";
    notes.appendChild(divCard);

    let divCardBody = document.createElement("div");
    divCardBody.className = "card-body";
    divCard.appendChild(divCardBody);

    let h1 = document.createElement("h1");
    h1.innerText = item.title;
    divCardBody.appendChild(h1);

    let pcontent = document.createElement("p");
    pcontent.innerText = item.content;
    divCardBody.appendChild(pcontent);

    let pLastTime = document.createElement("p");
    pLastTime.innerText = new Date(item.lastTime).toLocaleDateString();
    divCardBody.appendChild(pLastTime);

    divCard.addEventListener("click", (evt) => {
      showNotes(item);
    });
  });
};

listNotes();
