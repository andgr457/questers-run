import React, { useMemo } from 'react'
import {
  Card,
  Progress,
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
} from '@material-tailwind/react'
import { IRoadmap } from '../../../api/interfaces/roadmap/IRoadmap'
import { RoadmapRepository } from '../../../api/repositories/roadmap/RoadmapRepository'
import { LoggerService } from '../../../api/services/LoggerService'
import { CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface RoadmapProps {
  show: boolean
  onClose: () => void
}

export default function Roadmap({ show, onClose }: RoadmapProps) {
  const loggerService = new LoggerService('Roadmap')
  const repo = new RoadmapRepository(loggerService)
  const roadmapItems = repo.list()

  // Group by milestone
  const grouped = useMemo(() => {
    const map: Record<string, IRoadmap[]> = {}
    roadmapItems.forEach(item => {
      const key = item.milestone || 'Unassigned'
      if (!map[key]) map[key] = []
      map[key].push(item)
    })
    return map
  }, [roadmapItems])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-400 w-5 h-5" />
      case 'in-progress':
        return <Clock className="text-yellow-400 w-5 h-5" />
      default:
        return <AlertCircle className="text-gray-500 w-5 h-5" />
    }
  }

  return (
    <Dialog
      open={show}
      handler={onClose}
      size="xl"
      className="bg-gradient-to-br text-gray-900 rounded-2xl shadow-xl border-4 border-gray-400"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}    >
      <DialogHeader className="flex justify-between items-center border-b border-gray-800"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <h2 className="text-xl font-bold">📜 Quester’s Run Roadmap</h2>
        
      </DialogHeader>

      <DialogBody className="overflow-y-auto max-h-[80vh]"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className="p-4 space-y-8">
          {Object.entries(grouped).map(([milestone, items]) => (
            <div key={milestone}>
              <h2 className="text-lg font-semibold text-gray-500 mb-3 border-b border-gray-300 pb-1">
                {milestone}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {items.map(item => (
                  <Card
                    key={item.id}
                    className="border border-gray-400 p-4 rounded-lg"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-md font-semibold">{item.title}</h3>
                      {getStatusIcon(item.status)}
                    </div>

                    {item.subtitle && (
                      <p className="text-sm text-gray-900 mb-2">
                        {item.subtitle}
                      </p>
                    )}

                    {item.description && (
                      <p className="text-sm mb-3">
                        {item.description}
                      </p>
                    )}

                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{item.progress ?? 0}%</span>
                      {item.plannedReleaseDate && (
                        <span>
                          {new Date(item.plannedReleaseDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <Progress value={item.progress ?? 0} className="h-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogBody>
    </Dialog>
  )
}
