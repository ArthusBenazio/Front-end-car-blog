import axios from 'axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment'

const Write = () => {

  

  const state = useLocation().state
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');

  const navigate = useNavigate()

  const upload = async () => {
    try{
      const formData =new FormData()
      formData.append("file", file)
      const res = await axios.post("/upload", formData)
      return res.data
    } catch(err) {
      console.log(err)
    }
  }

  const handleClick = async e => {
    e.preventDefault()
    const imgUrl = await upload()


    try {
      state ? await axios.put(`/posts/${state.id}`, {
        title,
        desc:value,
        cat,
        img:file ? imgUrl : ""
      }) 
      : await axios.post(`/posts/`, {
        title,
        desc:value,
        cat,
        img:file ? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM--DD HH:mm:ss")
      })
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='add'>
      <div className='content'>
        <input type="text" value={title} placeholder='Title' onChange={e=>setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className='menu'>
        <div className="item">
          <h1>Publicar</h1>
          <span>
            <b>Status: </b> Rascunho
          </span>
          <span>
            <b>Visibilidade: </b> Pública
          </span>
          <input style={{ display: 'none' }} type="file" id='file' name='' onChange={e=>setFile(e.target.files[0])} />
          <label className='file' htmlFor="file">Upload Imagem</label>
          <div className="buttons">
            <button>Salvar modificações</button>
            <button onClick={handleClick}>Publicar</button>
          </div>
        </div>
        <div className="item">
          <h1>Categoria</h1>
          <div className="cat">
            <input type="radio" checked={cat === "esportivos"} name='cat' value='esportivos' id='esportivos' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="esportivos">Esportivos</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "classicos"} name='cat' value='classicos' id='classicos' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="classicos">Clássicos</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "eletricos"} name='cat' value='eletricos' id='eletricos' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="eletricos">Elétricos</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "hibridos"} name='cat' value='hibridos' id='hibridos' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="hibridos">Híbridos</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write