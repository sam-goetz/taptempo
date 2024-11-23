import Box from './Box'
import { Cached as CachedIcon } from '@mui/icons-material'
import { useState } from 'react'

function BpmBox() {

    const [resetKey, setResetKey] = useState(0)

    const handleReset = () => {
        setResetKey(prev => prev + 1)
    }

    return (
        <>
            <Box key={resetKey} />
            <CachedIcon onClick={handleReset} sx={{ mt: 2, color: 'white', cursor: 'pointer' }} />
        </>
    )
}

export default BpmBox

