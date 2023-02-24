import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, FC, SetStateAction } from 'react'
import style from '/styles/pages/Organization.module.scss'
import { sessionDataBlockILegacy, sessionDataColumnILegacy } from '../../../data/sessionsData'
import Block from '../Block/Block'
import { sessionInterface } from '../../helpers/interfaces'

interface EditFieldI {
  blockId: string
  setBlockIdEdit: Dispatch<SetStateAction<string>>

  indexOfTable: number
  session: sessionInterface
}

const EditField: FC<EditFieldI> = (props) => {
  const sessionBlocks = props.session.tables[props.indexOfTable]?.blocks

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
            {sessionBlocks &&
              sessionBlocks
                .filter((block) => block.id === props.blockId)
                .map((block, index) => {
                  return (
                    <Block
                      key={index}
                      setBlockIdEdit={props.setBlockIdEdit}
                      blockIdEdit={props.blockId}
                      isSelected={true}
                      index={index}
                      block={block}
                      idOfTable={props.session.tables[props.indexOfTable].id}
                      session={props.session}
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
