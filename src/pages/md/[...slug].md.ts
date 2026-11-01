import type { APIRoute } from 'astro';
import { paginasMarkdown, respuesta } from '../../markdown';

export const getStaticPaths = () => paginasMarkdown(false);
export const GET: APIRoute = ({ props }) => respuesta(props.texto);
