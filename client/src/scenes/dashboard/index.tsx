import { Box, useMediaQuery } from '@mui/material'

import Row1 from './Row1'
import Row2 from './Row2'
import Row3 from './Row3'

const gridTemplateLgScreens = `
  'expensesArea profitLine revenueBar'
  'expensesArea profitLine revenueBar'
  'expensesArea profitLine revenueBar'
  'expensesArea profitLine productScatter'
  'expensesLine targetsPie productScatter'
  'expensesLine targetsPie productScatter'
  'expensesLine h i'
  'g h i'
  'g h j'
  'g h j'
`

const gridTemplateSmScreens = `
  'expensesArea'
  'expensesArea'
  'expensesArea'
  'expensesArea'
  'profitLine'
  'profitLine'
  'profitLine'
  'profitLine'
  'revenueBar'
  'revenueBar'
  'revenueBar'
  'expensesLine'
  'expensesLine'
  'expensesLine'
  'targetsPie'
  'targetsPie'
  'productScatter'
  'productScatter'
  'productScatter'
  'g'
  'g'
  'g'
  'h'
  'h'
  'h'
  'h'
  'i'
  'i'
  'j'
  'j'
`

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery('(min-width: 1200px)')
  return (
    <Box
      width='100%'
      height='100%'
      display='grid'
      gap='1.5rem'
      sx={
        isAboveMediumScreens ? {
          gridTemplateColumns: 'repeat(3, minmax(370px, 1fr))',
          gridTemplateRows: 'repeat(10, minmax(60px, 1fr))',
          gridTemplateAreas: gridTemplateLgScreens
        } : {
          gridAutoColumns: '1fr',
          gridAutoRows: '80px',
          gridTemplateAreas: gridTemplateSmScreens
        }}
    >
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  )
}

export default Dashboard