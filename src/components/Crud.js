import React, { useState } from "react";
import { nanoid } from "nanoid";
export default function Crud() {
  // 1. HOOKS - Funciones que nos permiten sintetizar el manejo de datos en React
  // ESTABLECER UN NUEVO COMENTARIO
  const [newComment, setNewComment] = useState({
    title: "",
    description: "",
  });
  // ESTABLECER EL LISTADO DE TODOS LOS COMENTARIOS CREADOS
  const [comments, setComments] = useState([]);
  // ESTABLECER MENSAJES DE ERROR
  const [error, setError] = useState(null);
  // ESTABLECER EL ESTADO DE EDICIÓN
  const [edition, setEdition] = useState(false);
  // ESTABLECER UN ESTADO ID
  const [id, setId] = useState("");
  // 2. FORMULARIO
  const cambioInput = (event) => {
    setNewComment({
      ...newComment,
      id: nanoid(),
      [event.target.name]: event.target.value,
    });
  };
  // 3. CRUD
  const agregarComentario = (event) => {
    event.preventDefault();
    // VALIDACIONES
    // A. VERIFICAR QUE EL USUARIO NO ENVIE CAMPOS VACIOS
    if (!newComment.title.trim() || !newComment.description.trim()) {
      setError("Uno de tus campos está vacío");
      return;
    }
    // UN CAMBIO EN NUEVO ESTADO
    setComments([...comments, newComment]);
    // BORRAR CAMPOS DE TEXTO
    setNewComment({
      title: "",
      description: "",
    });
    // VERIFICACIÓN DE NULIDAD DE ERROR
    setError(null);
  };
  const borrarComentario = (id) => {
    console.log(id);
    // 1. LISTADO DE ARREGLOS [{ id: ____},{},{},{}]
    // Hacer un filter en la cual cuando coincida el id que queremos borrar con un elemento que se encuentra del arreglo, sacarlo del arreglo
    // id comparar con cada elemento ID
    // Cuando encuentra ese ID, lo quitamos con el mismo filter
    // Retornar un arreglo que NO incluya el Id que buscaba
    const arregloFiltrado = comments.filter((item) => {
      return id !== item.id;
    });
    setComments(arregloFiltrado);
  };
  const modoEditar = (e) => {
    // 1. TENER UN ESTADO DONDE YO PUEDO DECIRLE A LA APLICACIÓN QUE ESTAMOS EN MODO EDITAR
    setEdition(true);
    // 2. ESTABLECER EN NEWCOMMENT LOS DATOS DEL ELEMENTO QUE QUIERO EDITAR
    setNewComment({
      title: e.title,
      description: e.description,
    });
    setId(e.id);
  };
  const editarComentario = (event) => {
    // 1. Evitar que se recargue la página y perdamos todos los datos
    event.preventDefault();
    // 2. VALIDACIÓN
    // A. VERIFICAR QUE EL USUARIO NO ENVIE CAMPOS VACIOS
    if (!newComment.title.trim() || !newComment.description.trim()) {
      setError("Uno de tus campos está vacío");
      return;
    }
    // 3. MODIFICACIÓN DEL ELEMENTO
    // Tengo un arreglo de objetos [{},{},{},{}]
    // Coincidir el elemento que estoy buscando
    // Una vez que encontremos el elemento, modifiquemos sus valores (title, description, id)
    // Retornamos ese arreglo modificado hacia el estado de comments
    // [{},{},{ :) },{}]
    const arregloModificado = comments.map((item) => {
      // 1. NECESITO HACER UNA CONDICIONAL QUE VERIFIQUE QUE ES EL COMENTARIO QUE QUIERO EDITAR
      return item.id === id
        ? {
            id: id,
            title: newComment.title,
            description: newComment.description,
          }
        : item;
    });
    setComments(arregloModificado);
    // 4. TERMINAR MODO EDICIÓN
    setEdition(false);
    // 5. VACIAR CAMPOS DE TEXTO
    setNewComment({
      title: "",
      description: "",
    });
    // 6. CAMBIAR LOS ERRORES A NULOS
    setError(null);
  };
  // 4. RETORNO
  return (
    <>
      {/* TÍTULO */}
      <h2>{edition ? "Editar comentario" : "Crear comentario"}</h2>
      {/* FORMULARIO */}
      <form onSubmit={edition ? editarComentario : agregarComentario}>
        <h3>Título</h3>
        <input name="title" value={newComment.title} onChange={cambioInput} />
        <h3>Descripción</h3>
        <input
          name="description"
          value={newComment.description}
          onChange={cambioInput}
        />
        <button>{edition ? "Editar comentario" : "Agregar comentario"}</button>
      </form>
      {error ? error : null}
      {/* LISTADO DE COMENTARIOS */}
      <div>
        {comments.length === 0 ? (
          <h3>Aún no has creado comentarios</h3>
        ) : (
          comments.map((e) => {
            return (
              <div key={e.id}>
                <div>
                  <h3>{e.title}</h3>
                  <p>{e.description}</p>
                </div>
                <div>
                  <button onClick={() => borrarComentario(e.id)}>
                    Eliminar
                  </button>
                  <button
                    onClick={() => {
                      modoEditar(e);
                    }}
                  >
                    Editar
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
