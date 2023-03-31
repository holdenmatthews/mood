import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import EmotionList from './EmotionList'
import LogForm from './LogForm'
import AuthContext from '../store/authContext'
import { useNavigate } from 'react-router-dom'

const AddLog = () => {
  const [emotionList, setEmotionList] = useState([])
  const [selectedEmotions, setSelectedEmotions] = useState({})
  const [emotionValues, setEmotionValues] = useState({})
  const [notes, setNotes] = useState("")
  const [datetime, setDatetime] = useState("")
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()

  const getEmotions = () => {
    axios.get(`http://localhost:4444/api/emotions`, {
      headers: {
        authorization: token
      }
    })
    .then((res) => {
      setEmotionList(res.data)
    })
    .catch((err) => console.log(err))
  }

  const removeEmotion = (emotionId) => {
        delete selectedEmotions[emotionId]
        setSelectedEmotions({...selectedEmotions})
        delete emotionValues[emotionId]
        setEmotionValues({...emotionValues})
  }

  const addLog = () => {
    // console.log(emotionValues)
    axios.post(`http://localhost:4444/api/logs`, {
      notes,
      datetime,
      emotionValues
    }, {
      headers: {
        authorization: token
      }
    })
    .then((res) => {
      console.log(res.data)
      setSelectedEmotions({})
      setEmotionValues({})
      setNotes("")
      setDatetime("")
      navigate('/home')
    })
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    getEmotions()
  }, [])

  return (
    <div className="bg-gray-200 flex flex-col items-center gap-4 p-4 pt-16 min-h-screen">
      <LogForm 
        selectedEmotions={selectedEmotions}
        removeEmotion={removeEmotion}
        emotionValues={emotionValues}
        setEmotionValues={setEmotionValues}
        notes={notes}
        setNotes={setNotes}
        datetime={datetime}
        setDatetime={setDatetime}
        addLog={addLog}
      />
      <EmotionList 
        emotionList={emotionList}
        setEmotionList={setEmotionList}
        selectedEmotions={selectedEmotions}
        setSelectedEmotions={setSelectedEmotions}
        emotionValues={emotionValues}
        setEmotionValues={setEmotionValues}
      />
      </div>
  )
}

export default AddLog