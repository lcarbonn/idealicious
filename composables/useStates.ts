/**
 * State for AuthUser
 */
export const useAuthUser = () => useState<IAuthUser>("authUser");
/**
 * State for user
 */
export const useUser = () => useState<IUser|undefined>("user");
/**
 * State for snackbar message
 */
export const useSnackBarMessage = () => useState<ISnackMessage>("snackBarMessage");
/**
 * State of game
 */
export const useGame = () => useState<IGame|undefined>("game");
/**
 * State of player
 */
export const usePlayer = () => useState<IPlayer|undefined>("player");
/**
 * State of deck
 */
export const useDeck = () => useState<IDeck|undefined>("deck");
/**
 * State of idea
 */
export const useIdea = () => useState<IIdea>("idea");
/**
 * State of the last idea
 */
export const useLastIdea = () => useState<IIdea|undefined>("lastidea");
/**
 * State of number of players
 */
export const useGameNbOfPlayers = () => useState<number>("numberofplayers");
/**
 * State of list of decks with ideas
 */
export const useDecksWithIdeas = () => useState<Array<Array<IIdea>>>("decksWithIdeas");
/**
 * State of list of decks with sorted ideas
 */
export const useDecksWithIdeasSorted = () => useState<Array<Array<IIdea>>>("decksWithIdeasSorted");
/**
 * State of list of games
 */
export const useGames = () => useState<Array<IGame>>("games");
/**
 * State of array of players or empty array
 */
export const useGamePlayers = () => useState<Array<IPlayer>>("gamePlayers");
/**
 * State of array of users or empty array
 */
export const useUsers = () => useState<Array<IUser>>("users");
