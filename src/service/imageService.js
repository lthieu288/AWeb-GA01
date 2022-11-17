export async function getListMeme() {
  const response = await fetch("https://api.imgflip.com/get_memes");
  return response.json();
}
