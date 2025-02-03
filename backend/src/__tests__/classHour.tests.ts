import { Turn } from "#common/@enums/models";
import { ClassHourData } from "#common/@types/models";


const mwTestData: ClassHourData = {
    turn: Turn.Morning,
    sessionHour: 2,
    start: "15:00:00",
    end: "15:55:00",
}

describe("prueba de bobería", () => {
    it('should test that 1 + 1 === 2', () => {
        expect(1 + 1).toBe(2);
      });
});