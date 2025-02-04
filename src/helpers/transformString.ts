export const transformString = (input: string): string => {
  return input
    .split('_') // Divide el string en un array por el guion bajo
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toUpperCase() + word.slice(1) // Capitaliza la primera palabra
        : word // Las siguientes palabras permanecen iguales
    )
    .join(' '); // Une las palabras con un espacio
}