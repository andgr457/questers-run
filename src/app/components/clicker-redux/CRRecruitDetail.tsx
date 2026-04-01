import { CRRecruit } from './data/Recruits'

interface CRRecruitProps {
  show: boolean
  index: number
  recruit: CRRecruit
  children: React.ReactNode
}

export default function CRRecruitDetail(props: CRRecruitProps) {
  const {
    show,
    index,
    recruit,
    children,
  } = props


  return <div hidden={!show} className='member'>
    
    <div className='flex-wrap member-info' style={{gap: '1em'}}>
      <div>
        {index + 1}
      </div>
      <div className='member-title'>
        {recruit.name}
      </div>
      <div>
        {recruit.class}
      </div>
      <div>
        Lvl {recruit.level.value}
      </div>
      <div>
        Hire Cost {recruit.cost}
      </div>
    </div>
    <div className='flex-wrap' style={{gap: '1em'}}>
      {children}
    </div>
  </div>
}