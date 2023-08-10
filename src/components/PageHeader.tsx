import { size } from '@/styles/size'
import { zIdx } from '@/styles/z-index'

export function PageHeader() {
  return (
    <header
      className={`fixed z-${zIdx.header} top-0 h-[${size.headerHeight}px] w-full flex justify-between bg-orange-300`}
    >
      <div className="flex items-center justify-between w-full h-full">
        blanksql
      </div>
      <div className="flex">
        <div>b</div>
        <div>c</div>
        <div>c</div>
      </div>
    </header>
  )
}
