import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: 'tipo_contrato',
  timestamps: true
})

class TipoContrato extends Model {
  // Nombre
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  duracion!: number //La duracion puede ser 1 año, dos, etc

  // Apellido
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  plazo_aumento!: number //Establece cada cuanto es el aumento de importes, ej: 4 meses, 2 meses

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  alarma_aumento!: number //Establece cada cuanto es el aumento de importes, ej: 4 meses, 2 meses
}

export default TipoContrato;