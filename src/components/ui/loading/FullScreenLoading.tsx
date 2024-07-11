'use client'

import { Box, CircularProgress, Typography } from '@mui/material'

interface Props{
  message?: string
}

export const FullScreenLoading = ({ message='Cargando' }:Props) => {
  return (
    <Box 
        display='flex' 
        flexDirection='column'
        justifyContent='center' 
        alignItems='center' 
        height='calc(100vh - 200px)'
    >
        <Typography sx={{ mb: 3 }} variant="h2" fontWeight={ 200 } fontSize={ 20 }>{message}...</Typography>
        <CircularProgress thickness={ 2 } />
    </Box>
  )
}