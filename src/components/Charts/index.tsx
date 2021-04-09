import Bar from "./Bar"
import ChartCard from "./ChartCard"
import Field from "./Field"
import Gauge from "./Gauge"
import MiniArea from "./MiniArea"
import MiniBar from "./MiniBar"
import MiniProgress from "./MiniProgress"
import Pie from "./Pie"
import TagCloud from "./TagCloud"
import TimelineChart from "./TimelineChart"
import WaterWave from "./WaterWave"
import Map from "./Map"
import { formatNumber } from "@/utils/num"

const yuan = (val: number | string) => `¥ ${formatNumber(val, "0,0")}`

const Charts = {
  yuan,
  Bar,
  Map,
  Pie,
  Gauge,
  MiniBar,
  MiniArea,
  MiniProgress,
  ChartCard,
  Field,
  WaterWave,
  TagCloud,
  TimelineChart,
}

export {
  Charts as default,
  yuan,
  Bar,
  Pie,
  Gauge,
  MiniBar,
  MiniArea,
  MiniProgress,
  ChartCard,
  Field,
  Map,
  WaterWave,
  TagCloud,
  TimelineChart,
}
