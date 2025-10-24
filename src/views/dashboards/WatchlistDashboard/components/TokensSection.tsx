import { MagicToken, TokensPaginated } from "@/@types/tokens"
import MagicTokensTable from "../../common/MagicTokensTable"
import { FC } from "react"

type Props = {
    onPageChange: (newOffset: number) => void;
    paginatedTokens: TokensPaginated;
}

const TokensSection: FC<Props> = ({ onPageChange, paginatedTokens }) => {
    return (
        <div>
            <MagicTokensTable {...{ paginatedTokens, onPageChange }} />
        </div>
    )
}

export default TokensSection