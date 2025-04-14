import { SpeciesProfile } from "@/app/interfaces/data/profiles.interfaces";
import { SpeciesProfileResponse } from "@/app/interfaces/data/profiles.interfaces";

/**
 * Função auxiliar para obter o valor de uma chave em SpeciesProfile,
 * lidando com a possibilidade de a chave não existir em nenhuma das
 * profiles retornadas pela API.
 * @param {keyof SpeciesProfile} key A chave do valor que desejamos obter.
 * @returns {SpeciesProfile[T] | undefined} O valor da chave, ou undefined
 * se a chave não existir em nenhuma das profiles.
 */
export function getProfileValue<T extends keyof SpeciesProfile>(
  profiles: SpeciesProfileResponse,
  key: T
): SpeciesProfile[T] | undefined {
  return profiles.results.find((p) => p[key] !== undefined)?.[key];
}
