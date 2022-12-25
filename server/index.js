import { Configuration, OpenAIApi } from 'openai';
import welcomeMessage from './controller/welcomeMessage.js';
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';


dotenv.config()

// ##########################################################
const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
});

const openAI = new OpenAIApi(configuration);
// ##########################################################


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'));


app.get('/', welcomeMessage)


const openAIReplay = async (req, res) => {
    try {
        const prompt = req.body.prompt;
        console.log({ prompt });

        const response = await openAI.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 0, // Higher values means the model will take more risks.
            max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
            top_p: 1, // alternative to sampling with temperature, called nucleus sampling
            frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
            presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
        });

        console.log({ response })
        res.status(200).send({
            bot: response.data.choices[0].text,
        });

    } catch (error) {
        console.error({ error })
        res.status(500).send(error || 'Something went wrong');
    }
}


app.post('/', openAIReplay)


const PORT = 9500;
app.listen(PORT, () => console.log('AI server is running...', PORT))