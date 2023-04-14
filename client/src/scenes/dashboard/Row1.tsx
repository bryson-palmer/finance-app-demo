import { useMemo } from 'react'

import { useTheme } from '@mui/material'

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api'

type Props = {}

const Row1 = (props: Props) => {
  const { palette } = useTheme()
  const { data } = useGetKpisQuery()

  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses
        }
      })
  const revenueProfit = useMemo(() => (
    data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: (revenue - expenses).toFixed(2)
        }
      })
  ), [data])

  return (
    <>
      <DashboardBox gridArea='kpis'>
        <BoxHeader
          sideText='+4%'
          subtitle='top line represents revenue, bottom line represents expenses'
          title='Revenue and Expenses'
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient
                id='colorRevenue'
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop offset='5%' stopColor={palette.primary[300]} stopOpacity={0.5} />
                <stop offset='95%' stopColor={palette.primary[300]} stopOpacity={0} />
              </linearGradient>

              <linearGradient
                id='colorExpenses'
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop offset='5%' stopColor={palette.primary[300]} stopOpacity={0.5} />
                <stop offset='95%' stopColor={palette.primary[300]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: '0' }}
              style={{ fontSize: '10px' }}
              domain={[8000, 23000]}
            />
            <Tooltip />
            <Area
              dot={true}
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
              fillOpacity={1}
              fill='url(#colorRevenue)'
            />
            <Area
              dot={true}
              type="monotone"
              dataKey="expenses"
              stroke={palette.primary.main}
              fillOpacity={1}
              fill='url(#colorExpenses)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea='profit'>
        <BoxHeader
          sideText='+4%'
          subtitle='top line represents revenue, bottom line represents profit'
          title='Profit and Revenue'
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              yAxisId='left'
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              yAxisId='right'
              orientation='right'
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '10px' }}
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{
                margin: '0 0 10px 0'
              }}
            />
            <Line
             yAxisId='left'
             type='monotone'
             dataKey='profit'
             stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='revenue'
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default Row1