import Image from 'next/image';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { Tooltip } from '@nextui-org/react';
import {useHallOfFame} from '@/hooks/useHallOfFame';


const Hall = () => {
  const { players, loading} = useHallOfFame()

  if (loading) {
    return <Loading />;
  }
  return (
    <Layout>
    	<>
        <Table 
          color="default"
          selectionMode="none" 
          classNames={{
            table: "text-2xl",
            th: "text-2xl",
            td: " text-center text-3xl",
            tr: "text-4xl border-dotted border-x-0 border-t-0 border-b",
            tbody: "text-2xl"

          }} 
          aria-label="Kaotika Students">
          <TableHeader>
            <TableColumn className="text-center">Avatar</TableColumn>
            <TableColumn className="text-center">Name</TableColumn>
            <TableColumn className="text-center">Level</TableColumn>
            <TableColumn className="text-center">Experience</TableColumn>
            <TableColumn className="text-center">Gold</TableColumn>
            <TableColumn className="text-center">Loyalty</TableColumn>
            <TableColumn className="text-center">Status</TableColumn>
            <TableColumn className="text-center">Is Legend?</TableColumn>
          </TableHeader>
          <TableBody>
            {players?.map((player) => (
              <TableRow key={player._id}>
                <TableCell className="text-center"><div className="flex justify-center"><Image src={player.avatar} alt="User Avatar" width={64} height={64} className="sepia rounded-full" /></div></TableCell>
                <TableCell className="text-center">{player.nickname}</TableCell>
                <TableCell className="text-center">{player.level}</TableCell> 
                <TableCell className="text-center">{Math.trunc(player.experience)} xp</TableCell>
                <TableCell className="text-center">{player.gold} coins</TableCell>
                <TableCell className="text-center">{player.isBetrayer 
                  ? <div className="flex justify-center"><Tooltip className="w-96 text-4xl mb-4 border-1 rounded-lg border-sepia bg-black/90" placement="left" size='sm' showArrow={true} content="The player is a dirty traitor"><Image src="/images/icons/betrayer.png" alt="Betrayar image" width={64} height={64} className="rounded-full" /></Tooltip></div>
                  : <div className="flex justify-center"><Tooltip className="w-96 text-4xl mb-4 border-1 rounded-lg border-sepia bg-black/90" placement="left" size='sm' showArrow={true} content="The Player is loyal to Kaotika"><Image src="/images/icons/loyal.png" alt="Loyal image" width={64} height={64} className="rounded-full" /></Tooltip></div>}
                </TableCell>
                <TableCell className="text-center">{player.attributes.constitution + player.attributes.dexterity - player.attributes.insanity / 2 > 0 
                  ? <div className="flex justify-center"><Tooltip className="w-96 text-4xl mb-4 border-1 rounded-lg border-sepia bg-black/90" placement="left" size='sm' showArrow={true} content="The Player Is Alive"><Image src="/images/icons/heart.png" alt="Heart image" width={64} height={64} className="sepia rounded-full" /></Tooltip></div>
                  : <div className="flex justify-center"><Tooltip className="w-96 text-4xl mb-4 border-1 rounded-lg border-sepia bg-black/90" placement="left" size='sm' showArrow={true} content="The Player Died In The Battle"><Image src="/images/icons/cross.png" alt="Cross imager" width={64} height={64} className="sepia rounded-full" /></Tooltip></div>}
                </TableCell>
                <TableCell className="text-center">{player.is_active 
                  ? <div className="flex justify-center"><Tooltip className="w-96 text-4xl mb-4 border-1 rounded-lg border-sepia bg-black/90" placement="left" size='sm' showArrow={true} content="Currently Suffering"><Image src="/images/icons/playing.png" alt="Playing image" width={64} height={64} className="sepia rounded-full" /></Tooltip></div>
                  : <div className="flex justify-center"><Tooltip className="w-96 text-4xl mb-4 border-1 rounded-lg border-sepia bg-black/90" placement="left" size='sm' showArrow={true} content="The Player is Legend"><Image src="/images/icons/legend.png" alt="Legend image" width={64} height={64} className="sepia rounded-full" /></Tooltip></div>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
		</Layout>
  )
}



export default Hall;
