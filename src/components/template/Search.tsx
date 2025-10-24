

import { useState, useRef, useEffect } from 'react'
import classNames from '@/utils/classNames'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import ScrollBar from '@/components/ui/ScrollBar'
import { HiOutlineSearch, HiChevronRight } from 'react-icons/hi'
import { PiMagnifyingGlassDuotone } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import Highlighter from 'react-highlight-words'
import { IoMdClose, IoMdTrash } from "react-icons/io"
import { apiClearSearchHistory, apiGetSearchHistory, apiRemoveSearchHistory, apiSearchOneToken } from '@/services/MagicTokensService'
import { MagicToken, SearchHistory} from '@/@types/tokens'
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { useApp } from '@/store/appStore'

const _Search = ({ className }: { className?: string }) => {
    const [searchDialogOpen, setSearchDialogOpen] = useState(false)
    const [searchResults, setSearchResults] = useState<MagicToken[]>([])
    const [loading, setLoading] = useState(false)
    const [noResults, setNoResults] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const { setSelectedMagicToken } = useApp()
    const navigate = useNavigate()
    const [progress, setProgress] = useState(0)
    const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([])

    useEffect(() => {
        fetchSearchHistory()
    }, [])

    const fetchSearchHistory = async () => {
        try {
            const history = await apiGetSearchHistory()
            setSearchHistory(history)
        } catch (error) {
            console.error("Error fetching search history:", error)
        }
    }

    const handleSearchHistoryClick = async (historyItem: SearchHistory) => {
        setSearchQuery(historyItem.tokenAddress)
        setSearchResults([])
        setNoResults(false)
        setLoading(true)
        setProgress(0)
        startProgressAnimation()

        try {
            const response = await apiSearchOneToken(historyItem.tokenAddress)
            completeProgress()
            if (response?.tokens?.length > 0) {
                setSearchResults(response.tokens)
            } else {
                setSearchResults([])
                setNoResults(true)
            }
        } catch (error) {
            console.error("Search error:", error)
            completeProgress()
            setSearchResults([])
            setNoResults(true)
        }
    }

    const handleClearSearchHistory = async () => {
        try {
            await apiClearSearchHistory()
            setSearchHistory([])
        } catch (error) {
            console.error("Error clearing search history:", error)
        }
    }

    const handleRemoveSearchHistory = async (historyItem: SearchHistory) => {
        try {
            await apiRemoveSearchHistory(historyItem.tokenAddress)
            setSearchHistory(prev => prev.filter(item => item.tokenAddress !== historyItem.tokenAddress))
        } catch (error) {
            console.error("Error removing search history item:", error)
        }
    }

    const handleTokenClicked = (token: MagicToken) => {
        setSelectedMagicToken(token)
        navigate("/dashboards/token-details")
        setSearchDialogOpen(false)
        setSearchResults([])
        setLoading(false)
        setProgress(0)
        setSearchQuery('')
        setNoResults(false)
    }

    const inputRef = useRef<HTMLInputElement>(null)

    const handleSearchOpen = () => {
        setSearchDialogOpen(true)
        fetchSearchHistory()
    }

    const handleSearchClose = () => {
        setSearchDialogOpen(false)
        setSearchResults([])
        setLoading(false)
        setProgress(0)
        setSearchHistory([])
        setSearchQuery('')
        setNoResults(false)
    }

    const startProgressAnimation = () => {
        let currentProgress = 0
        const increment = 10
        const intervalDuration = 1500

        if (progressInterval.current !== null) {
            clearInterval(progressInterval.current)
            progressInterval.current = null
        }

        progressInterval.current = window.setInterval(() => {
            currentProgress = Math.min(currentProgress + increment, 90)
            setProgress(currentProgress)

            if (currentProgress >= 90 && progressInterval.current !== null) {
                clearInterval(progressInterval.current)
                progressInterval.current = null
            }
        }, intervalDuration)
    }

    const completeProgress = () => {
        if (progressInterval.current) {
            clearInterval(progressInterval.current)
        }
        setProgress(100)
        setTimeout(() => setLoading(false), 300)
    }

    const [searchStage, setSearchStage] = useState<'idle' | 'searching' | 'processing'>('idle')
    const progressInterval = useRef<number | null>(null)

    useEffect(() => {
        return () => {
            if (progressInterval.current) {
                clearInterval(progressInterval.current)
            }
        }
    }, [])

    const handleSearch = async () => {
        if (searchQuery.length < 2) return

        setLoading(true)
        setNoResults(false)
        setProgress(0)
        startProgressAnimation()

        try {
            const response = await apiSearchOneToken(searchQuery)
            completeProgress()

            if (response?.tokens?.length > 0) {
                setSearchResults(response.tokens)
            } else {
                setSearchResults([])
                setNoResults(true)
            }
        } catch (error) {
            console.error("Search error:", error)
            completeProgress()
            setSearchResults([])
            setNoResults(true)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    useEffect(() => {
        if (searchDialogOpen) {
            const timeout = setTimeout(() => inputRef.current?.focus(), 100)
            return () => clearTimeout(timeout)
        }
    }, [searchDialogOpen])

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <>
            <div
                className="bg-gray-700 p-1.5 rounded-lg 2md:hidden cursor-pointer shadow-sm hover:bg-gray-600"
                onClick={handleSearchOpen}
            >
                <PiMagnifyingGlassDuotone size={25} />
            </div>
            <div
                className="bg-gray-700 border cursor-pointer hidden 2md:flex items-center gap-3 rounded-2xl border-gray-700 pl-4 pr-3 llg2:pr-40 py-2 text-sm shadow-sm hover:bg-gray-600"
                onClick={handleSearchOpen}
            >
                <PiMagnifyingGlassDuotone size={20} />
                <span>Search token name, symbol, or contract address</span>
            </div>

            {/* Search Dialog */}
            <Dialog
                contentClassName="p-0"
                isOpen={searchDialogOpen}
                closable={false}
                onRequestClose={handleSearchClose}
                width={600}
            >
                <div>
                    <div className="px-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center w-full">
                            <HiOutlineSearch className="text-xl mr-2" />
                            <input
                                ref={inputRef}
                                className="ring-0 outline-none block w-full p-4 text-base bg-transparent text-gray-900 dark:text-gray-100"
                                placeholder="Search tokens..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <Button
                            size="xs"
                            onClick={handleSearchClose}
                            className="ml-2"
                        >
                            <IoMdClose />
                        </Button>
                    </div>
                    <div className="py-4 px-5">
                        <Button
                            className="w-full mb-4"
                            variant="solid"
                            onClick={handleSearch}
                            loading={loading}
                            disabled={searchQuery.length < 2}
                        >
                            Search Tokens
                        </Button>

                        <ScrollBar className="max-h-[350px] overflow-y-auto">
                            {/* Search History Section */}
                            {searchHistory.length > 0 && !loading && !searchResults.length && (
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-3">
                                        <h6 className="text-sm font-semibold">Search History</h6>
                                        <Button
                                            size="sm"
                                            variant="plain"
                                            icon={<IoMdTrash />}
                                            onClick={handleClearSearchHistory}
                                        >
                                            Clear All
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        {searchHistory.map((historyItem) => (
                                            <div
                                                key={historyItem.tokenAddress}
                                                className="flex items-center justify-between rounded-lg p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                                            >
                                                <div
                                                    className="flex-1"
                                                    onClick={() => handleSearchHistoryClick(historyItem)}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Highlighter
                                                            autoEscape
                                                            highlightClassName="text-primary bg-transparent font-semibold"
                                                            searchWords={[searchQuery]}
                                                            textToHighlight={historyItem.tokenName || 'Unnamed Token'}
                                                        />
                                                        <span className="text-gray-500 text-sm">
                                                            {historyItem.tokenSymbol}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        <Highlighter
                                                            autoEscape
                                                            highlightClassName="text-primary bg-transparent font-semibold"
                                                            searchWords={[searchQuery]}
                                                            textToHighlight={historyItem.tokenAddress}
                                                        />
                                                    </div>
                                                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                                        Searched: {formatTimestamp(historyItem.searchTime)}
                                                    </div>
                                                </div>
                                                <Button
                                                    size="xs"
                                                    variant="plain"
                                                    icon={<IoMdTrash />}
                                                    onClick={() => handleRemoveSearchHistory(historyItem)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Search Results Section */}
                            {loading ? (
                                <div className="flex flex-col items-center justify-center my-10">
                                    <div style={{ width: 120, height: 120 }} className="mb-4">
                                        <CircularProgressbar
                                            value={progress}
                                            text={`${progress}%`}
                                            styles={buildStyles({
                                                pathTransitionDuration: 0.1,
                                                pathColor: `#22c55e`,
                                                textColor: '#fff',
                                                trailColor: '#374151',
                                            })}
                                        />
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {progress < 30 ? "Initializing search..." :
                                            progress < 70 ? "Querying token data..." :
                                                progress < 90 ? "Processing results..." :
                                                    "Finalizing..."}
                                    </p>
                                </div>
                            ) : noResults ? (
                                <div className="my-10 text-center text-lg">
                                    <span>No results for </span>
                                    <span className="text-primary">
                                        {`'${searchQuery}'`}
                                    </span>
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div className="space-y-3">
                                    <h6 className="text-sm font-semibold mb-3">Search Results</h6>
                                    {searchResults.map((token) => (
                                        <div
                                            onClick={() => handleTokenClicked(token)}
                                            key={token.metadata.mintAddress}
                                            className={classNames(
                                                'flex items-center justify-between rounded-xl p-3 cursor-pointer',
                                                'hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                {token.metadata.image && (
                                                    <img
                                                        src={token.metadata.image}
                                                        alt={token.metadata.name}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                )}
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <Highlighter
                                                            autoEscape
                                                            highlightClassName="text-primary bg-transparent font-semibold"
                                                            searchWords={[searchQuery]}
                                                            textToHighlight={token.metadata.name || 'Unnamed Token'}
                                                        />
                                                        <span className="text-gray-500 text-sm">
                                                            {token.metadata.symbol}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        <Highlighter
                                                            autoEscape
                                                            highlightClassName="text-primary bg-transparent font-semibold"
                                                            searchWords={[searchQuery]}
                                                            textToHighlight={token.metadata.mintAddress}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-medium">
                                                    ${token.metadata.priceUsd?.toLocaleString() || 'N/A'}
                                                </div>
                                                <div className={`text-xs ${(token.priceChange?.h24 || 0) >= 0
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                                    }`}>
                                                    {token.priceChange?.h24?.toFixed(2) || 0}%
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </ScrollBar>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

const Search = withHeaderItem(_Search)

export default Search