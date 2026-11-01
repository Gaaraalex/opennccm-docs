import type { APIRoute } from 'astro';
import { paginasMarkdown, respuesta } from '../../../markdown';

export const getStaticPaths = () => paginasMarkdown(true);
export const GET: APIRoute = ({ props }) => respuesta(props.texto);
