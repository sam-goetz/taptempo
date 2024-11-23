import { Box as MuiBox, Typography } from '@mui/material'
import { useState, useEffect, useCallback } from 'react'
import './Box.css'

// Interface can be moved outside
interface TimeArray {
    timestamp: number
}

// Pure calculation function can be moved outside
const calculateBpmFromArray = (timeArray: TimeArray[]): number => {
    if (timeArray.length < 2) return 0

    const timeDifferences = []
    for (let i = 1; i < timeArray.length; i++) {
        timeDifferences.push(timeArray[i].timestamp - timeArray[i - 1].timestamp)
    }

    const averageTimeDiff = timeDifferences.reduce((a, b) => a + b, 0) / timeDifferences.length
    return Math.round(60000 / averageTimeDiff)
}

function Box() {
    const [bpm, setBpm] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [timeArray, setTimeArray] = useState<TimeArray[]>([{ timestamp: new Date().getTime() }])

    // This needs to stay inside because it uses state setters
    const handleTime = useCallback((event: KeyboardEvent | MouseEvent) => {
        if ((event instanceof KeyboardEvent && event.code === 'Space') || event.type === 'click') {
            setIsActive(true)
            setTimeout(() => {
                setIsActive(false)
            }, 100)

            const newTimeArray = [...timeArray.slice(-8), { timestamp: new Date().getTime() }]
            setTimeArray(newTimeArray)
            setBpm(calculateBpmFromArray(newTimeArray))
        }
    }, [timeArray])

    useEffect(() => {
        window.addEventListener('keydown', handleTime)
        return () => {
            window.removeEventListener('keydown', handleTime)
        }
    }, [handleTime])

    return <MuiBox
        className={`box ${isActive ? 'active' : ''}`}
        onClick={handleTime as unknown as React.MouseEventHandler<HTMLDivElement>}
        sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 1,
            bgcolor: 'background.paper',
            boxShadow: 1,
            transition: 'background-color 0.1s',
            '&.active': {
                bgcolor: 'magenta',
            }
        }}
    >
        <Typography variant="h1">{bpm} BPM</Typography>
        <Typography variant="subtitle1">Press spacebar or click to tap</Typography>
        <Typography variant="body2">Your last 8 taps are averaged</Typography>

    </MuiBox>
}

export default Box;