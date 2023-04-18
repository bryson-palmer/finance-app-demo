import { useMemo } from "react"

import { Box, Typography, useTheme } from "@mui/material"
import { DataGrid, GridCellParams } from "@mui/x-data-grid"

import { Cell, Pie, PieChart } from "recharts"

import BoxHeader from "@/components/BoxHeader"
import DashboardBox from "@/components/DashboardBox"
import FlexBetween from "@/components/FlexBetween"
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/state/api"

const Row3 = () => {
  const { data: kpiData } = useGetKpisQuery()
  const { data: productData } = useGetProductsQuery()
  const { data: transactionData } = useGetTransactionsQuery()

  const { palette } = useTheme()
  const pieColors = [palette.primary[800], palette.primary[500]]

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value
            }
          ]
        }
      )
    }
  }, [kpiData])

  const productColumns = [
    {
      field: '_id',
      headerName: 'id',
      flex: 1
    },
    {
      field: 'expense',
      headerName: 'Expense',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    }
  ]

  const transactionColumns = [
    {
      field: '_id',
      headerName: 'id',
      flex: 1
    },
    {
      field: 'buyer',
      headerName: 'Buyer',
      flex: 0.67,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: 'productIds',
      headerName: 'Count',
      flex: 0.1,
      renderCell: (params: GridCellParams) => (params.value as Array<string>).length,
    }
  ]

  return (
    <>
      <DashboardBox gridArea='g'>
        <BoxHeader
          sideText={`${productData?.length} products`}
          title='List of Products'
        />
        <Box
          mt='0.5rem'
          p='0 0.5rem'
          height='75%'
          sx={{
            '& .MuiDataGrid-root': {
              color: palette.grey[300],
              border: 'none'
            },
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            '& .MuiDataGrid-columnSeparator': {
              visibility: 'hidden',
            }
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea='h'>
      <BoxHeader
          sideText={`${transactionData?.length} latest transactions`}
          title='Recent Orders'
        />
        <Box
          mt='1rem'
          p='0 0.5rem'
          height='80%'
          sx={{
            '& .MuiDataGrid-root': {
              color: palette.grey[300],
              border: 'none'
            },
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            '& .MuiDataGrid-separator': {
              visibility: 'hidden',
            }
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea='i'>
        <BoxHeader
          sideText='+4%'
          title='Expense Breakdown By Category'
        />
        <FlexBetween mt='0.5rem' gap='0.5rem' p='0 1rem' textAlign='center'>
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart
                width={100}
                height={75}
              >
                <Pie
                  data={data}
                  dataKey="value"
                  stroke='none'
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index]}
                    />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant='h5'>{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea='j'>
      <BoxHeader
          sideText='15%'
          title='Overall Summary and Explanation Data'
        />
        <Box
          height='15px'
          margin='1.25rem 1rem 0.4rem 1rem'
          bgcolor={palette.primary[800]}
          borderRadius='1rem'
        >
          <Box
            height='15px'
            bgcolor={palette.primary[600]}
            borderRadius='1rem'
            width='40%'
          />
        </Box>
        <Typography margin='0 1rem' variant='h6'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
          numquam blanditiis harum quisquam.</Typography>
      </DashboardBox>
    </>
  )
}

export default Row3