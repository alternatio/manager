import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, FC, SetStateAction } from 'react'
import style from '/styles/pages/Organization.module.scss'
import { sessionDataBlockILegacy, sessionDataColumnILegacy } from '../../../data/sessionsData'
import Block from '../Block/Block'

interface EditFieldI {
  columns: sessionDataColumnILegacy[]
  blocks: sessionDataBlockILegacy[]
  setBlocks: Dispatch<SetStateAction<sessionDataBlockILegacy[]>>
  blockId: string
  setBlockIdEdit: Dispatch<SetStateAction<string>>
}

const EditField: FC<EditFieldI> = (props) => {
  return (
    <AnimatePresence>
      {props.blockId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={style.editField}
        >
          {/*<div*/}
          {/*  onClick={() => props.setBlockIdEdit('')}*/}
          {/*  className={style.backgroundEditBlock}>*/}

          {/*</div>*/}
          <motion.div className={style.editBlock}>
            {props.blocks
              .filter((block) => block.id === props.blockId)
              .map((block, index) => {
                return (
                  <Block
                    key={index}
                    id={block.id}
                    title={block.title}
                    status={block.status}
                    color={block.color}
                    isRequired={block.isRequired}
                    isUrgent={block.isUrgent}
                    text={block.text}
                    dateToComplete={block.dateToComplete}
                    blocks={props.blocks}
                    setBlocks={props.setBlocks}
                    setBlockIdEdit={props.setBlockIdEdit}
                    blockIdEdit={props.blockId}
                    isSelected={true}
                    columns={props.columns}
                    index={index}
                  />
                )
              })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

EditField.displayName = 'Edit field'
export default EditField
