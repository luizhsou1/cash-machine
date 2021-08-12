/* eslint-disable @typescript-eslint/no-misused-promises */
import { Application } from 'express'
import { CashMachine } from '../../domain/cash-machine'
import { memoryMoneyRepository } from '../../infra/repositories/memory-money-repository'

/**
* @swagger
*
* components:
*   schemas:
*     Withdraw:
*       type: object
*       required:
*         - valueToWithdraw
*       properties:
*         valueToWithdraw:
*           type: integer
*           example: 100
*
*     Money:
*       type: object
*       required:
*         - value
*         - quantity
*       properties:
*         value:
*           type: integer
*           enum: [100, 50, 20, 10]
*         quantity:
*           type: integer
*           example: 1
*/

export const setup = (app: Application): void => {
  const cashMachine = new CashMachine(memoryMoneyRepository)

  /**
  * @swagger
  *
  * /cash-machine/withdraw:
  *   post:
  *     tags: ['API']
  *     summary: Simulates withdrawal from an cash machine
  *     requestBody:
  *       description: Person simulation data
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/Withdraw'
  *     responses:
  *       '200':
  *         description: successful operation
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/Money'
  *       '422':
  *         description: Validation Error
  *       '500':
  *         description: internal server error
  */
  app.post('/cash-machine/withdraw', async (req, res, next) => {
    try {
      const moneysToWithdraw = await cashMachine.withdraw(req.body.valueToWithdraw)
      res.json(moneysToWithdraw)
    } catch (err) {
      next(err)
    }
  })
}
