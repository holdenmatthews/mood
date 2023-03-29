import React from 'react'
import LogCard from './LogCard'

const LogDisplay = (props) => {
  const { displayLogs, deleteLog } = props
  // console.log(userLogs)
  return (
    <div>
      {
          displayLogs.sort((a,b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
          .reverse().map((log) => <LogCard log={log} key={log.id} deleteLog={deleteLog} />)
      }
    </div>
  )
}

export default LogDisplay