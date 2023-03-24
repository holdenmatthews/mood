import React from 'react'

const EmotionList = (props) => {
    const { emotionList, selectedEmotions, setSelectedEmotions, emotionValues, setEmotionValues } = props

    const handleSelect = (e) => {
        const newEmotion = e.target.textContent
        if (!selectedEmotions.includes(newEmotion)) {
        setSelectedEmotions([...selectedEmotions, newEmotion])
        setEmotionValues({...emotionValues, [newEmotion]: 0})
        }
      }

  return (
    <div>{emotionList.map((emotion) => {
        return <div onClick={handleSelect}>{emotion.name}</div>
      })}</div>
  )
}

export default EmotionList