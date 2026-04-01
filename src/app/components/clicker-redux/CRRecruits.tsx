import CRMemberDetail from './CRMemberDetail'
import CRRecruitDetail from './CRRecruitDetail'
import { GUILD_LEVEL_RECRUIT_LEVEL, GUILD_LEVEL_RECRUIT_LIMIT } from './data/GuildMeta'
import { RECRUITS } from './data/Recruits'

interface CRRecruitsProps {
  show: boolean
  guildGold: number
  guildLevel: number
  memberCount: number
}

export default function CRRecruits(props: CRRecruitsProps) {
  const {
    show,
    guildGold,
    guildLevel,
    memberCount,
  } = props

  const RECRUIT_MAX_LEVEL = GUILD_LEVEL_RECRUIT_LEVEL[guildLevel]
  const RECRUIT_LIMIT = GUILD_LEVEL_RECRUIT_LIMIT[guildLevel]

  const cantRecruitLimit = memberCount >= RECRUIT_LIMIT

  return <div hidden={!show} className='guild-manage-app'>
    <div className='guild-manage-app-title'>
      Guild Member Recruitment
    </div>
    <div className='recruit-settings'>
      <div>
        Guild Gold {guildGold} Guild Recruit Limit {RECRUIT_LIMIT}
      </div>
      <div className='recruit-setting'>
        
      </div>
    </div>
    <div>
      {`${cantRecruitLimit} ${RECRUIT_LIMIT}`}
    </div>
    <div>
      {`${RECRUIT_MAX_LEVEL}`}
    </div>
    <div>
      {RECRUITS.map((r, i) => {
        const canRecruitLevel = r.level.value <= RECRUIT_MAX_LEVEL
        return <CRRecruitDetail
          index={i}
          recruit={r}
          show={true}
        >
          {canRecruitLevel && !cantRecruitLimit && <button hidden={!canRecruitLevel || cantRecruitLimit}>
            Hire
          </button>}
          {!canRecruitLevel && <div>Too High of Level for Guild</div>}
          {cantRecruitLimit && <div>Max {RECRUIT_LIMIT} members reached.</div>}
          
        </CRRecruitDetail>
      })}
    </div>
  </div>
}