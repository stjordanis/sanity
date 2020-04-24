/* eslint-disable @typescript-eslint/explicit-function-return-type */

import * as React from 'react'
import {HistorySelectionRange, HistoryTimelineEvent, RevisionRange} from '../history'
import {HistoryTimeline} from './timeline/HistoryTimeline'

import styles from './HistoryNavigator.css'

interface Props {
  error: Error | null
  events: HistoryTimelineEvent[]
  isLoading: boolean
  selection: RevisionRange
  selectionRange: HistorySelectionRange
  onSelect: (selection: RevisionRange) => void
}

function HistoryNavigator(props: Props) {
  const {error, events, isLoading, selection, selectionRange, onSelect} = props
  const [now, setNow] = React.useState(Date.now())

  React.useEffect(() => {
    const nowIntervalId = setInterval(() => setNow(Date.now()), 10000)
    return () => clearInterval(nowIntervalId)
  }, [])

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.title}>History</div>
      </header>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {!(isLoading || error || events.length === 0) && (
        <div className={styles.timelineContainer}>
          <HistoryTimeline
            events={events}
            now={now}
            selection={selection}
            selectionRange={selectionRange}
            onSelect={onSelect}
          />
        </div>
      )}

      {!(isLoading || error || events.length > 0) && <div>No events</div>}
    </div>
  )
}

export default HistoryNavigator