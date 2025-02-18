type FieldNames = 'id' | 'name' | 'email' | 'phoneNumber' | 'role' | 'classHourId' | 'igtModuleId' | 'day' | 'teacherId' | 'groupId' | 'moduleId' | 'weeklyHours' | 'description' | 'startDate' | 'endDate' | 'startHour' | 'endHour' | 'turn' | 'sessionHour';

export const fieldTranslations: Record<FieldNames, string> = {
  id: "ID",
  name: "Nombre",
  email: "Correo Electrónico",
  phoneNumber: "Número de Teléfono",
  role: "Rol",
  classHourId: "Hora de Clase",
  igtModuleId: "Módulo IGT",
  day: "Día",
  teacherId: "ID del Profesor",
  groupId: "ID del Grupo",
  moduleId: "ID del Módulo",
  weeklyHours: "Horas Semanales",
  description: "Descripción",
  startDate: "Fecha de Inicio",
  endDate: "Fecha de Fin",
  startHour: "Hora de Inicio",
  endHour: "Hora de Fin",
  turn: "Turno",
  sessionHour: "Hora de la Sesión",
};
