import { Typography } from "@material-tailwind/react"
import { camelToReadable } from "../entity/entity.service"

interface TableListProps {
    objects: any[]
    title: string
    imgPath: string
}
export default function TableList(props: TableListProps) {
    if(!props.objects || props.objects.length === 0){
        return (
            <>Nothing to show...</>
        )
    }
    return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-max table-auto text-left" >
        <thead>
          <tr style={{maxWidth: '100px'}}>
            <th 
                     className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">{props.title}</th>
          {Object.getOwnPropertyNames(props.objects[0]).map((propertyName) => (
                     <th
                     key={propertyName}
                     className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                   >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                   {camelToReadable(propertyName)}
                </Typography>
                </th>
                  ))}
          </tr>
        </thead>
        <tbody>
        
          {props.objects.map((o) => (
            <tr style={{maxWidth: '100%'}}>
              <td>
              <div style={{width: '45px'}}>
              <img src={`${props.imgPath}${o.imageName}`} alt={`${o.name?.toUpperCase()}`} />
              </div>
              </td>
            {Object.getOwnPropertyNames(props.objects[0]).map((propertyName) => (
            <td className="p-4" style={{ fontSize: '.7em' }}>
                {propertyName === 'description' ? '' : Array.isArray(o[propertyName]) ? o[propertyName].join(', ') : `${o[propertyName]}`}
            </td>
            ))}

            </tr>

          ))}
        </tbody>
        </table>
      </div>

    )
}
